import boto3
import os
import tempfile
import pandas as pd
from openpyxl import load_workbook
from openpyxl.utils import get_column_letter
import base64
from io import BytesIO
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

s3 = boto3.client("s3")

def lambda_handler(event, context):
    bucket_name = "my-test-bucket-forpdf"
    excel_key = "test-file.xlsx"
    pdf_key = excel_key.rsplit(".", 1)[0] + ".pdf"
    
    # 创建临时目录
    temp_dir = tempfile.mkdtemp()
    excel_path = os.path.join(temp_dir, "input.xlsx")
    pdf_path = os.path.join(temp_dir, "output.pdf")
    html_path = os.path.join(temp_dir, "temp.html")
    
    try:
        # 从 S3 下载 Excel 文件
        s3.download_file(bucket_name, excel_key, excel_path)
        
        # 转换为 PDF，使用高级方法
        convert_excel_to_pdf_advanced(excel_path, pdf_path, html_path)
        
        # 上传 PDF 到 S3
        s3.upload_file(pdf_path, bucket_name, pdf_key)
        
        return {
            "statusCode": 200,
            "body": {
                "message": "Conversion successful",
                "source_file": excel_key,
                "output_file": pdf_key,
            },
        }
    except Exception as e:
        return {"statusCode": 500, "body": f"Error: {str(e)}"}
    finally:
        # 清理临时文件
        for file_path in [excel_path, pdf_path, html_path]:
            if os.path.exists(file_path):
                os.remove(file_path)
        os.rmdir(temp_dir)

def convert_excel_to_pdf_advanced(excel_path, pdf_path, html_path):
    # 加载工作簿
    wb = load_workbook(excel_path)
    active_sheet = wb.active
    
    # 开始构建HTML
    html_content = """
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <style>
            @page {
                size: A4;
                margin: 1cm;
            }
            body {
                font-family: "MS Gothic", "Noto Sans JP", sans-serif;
                font-size: 10pt;
            }
            table {
                border-collapse: collapse;
                width: 100%;
            }
            td {
                border: 1px solid black;
                padding: 4px;
                vertical-align: middle;
            }
            .merged-cell {
                background-color: #f9f9f9;
            }
            .text-center {
                text-align: center;
            }
            .text-right {
                text-align: right;
            }
            .text-left {
                text-align: left;
            }
            .bold {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
    """
    
    # 获取合并单元格信息
    merged_cells = active_sheet.merged_cells.ranges
    merged_cell_coords = []
    for merged_range in merged_cells:
        coords = []
        min_row, min_col, max_row, max_col = merged_range.min_row, merged_range.min_col, merged_range.max_row, merged_range.max_col
        for row in range(min_row, max_row + 1):
            for col in range(min_col, max_col + 1):
                coords.append((row, col))
        merged_cell_coords.append({
            'coordinates': coords,
            'main': (min_row, min_col),
            'rowspan': max_row - min_row + 1,
            'colspan': max_col - min_col + 1
        })
    
    # 开始构建表格
    html_content += "<table>"
    
    # 处理每一行
    for row_idx in range(1, active_sheet.max_row + 1):
        html_content += "<tr>"
        
        # 处理每一列
        for col_idx in range(1, active_sheet.max_column + 1):
            cell = active_sheet.cell(row=row_idx, column=col_idx)
            
            # 检查是否为合并单元格的一部分
            is_merged = False
            is_main_cell = False
            rowspan = 1
            colspan = 1
            
            for merged_info in merged_cell_coords:
                if (row_idx, col_idx) in merged_info['coordinates']:
                    is_merged = True
                    if (row_idx, col_idx) == merged_info['main']:
                        is_main_cell = True
                        rowspan = merged_info['rowspan']
                        colspan = merged_info['colspan']
                    else:
                        # 如果是合并单元格的非主单元格，跳过
                        is_main_cell = False
                    break
            
            # 如果是合并单元格的非主单元格，跳过
            if is_merged and not is_main_cell:
                continue
            
            # 确定对齐方式
            alignment = 'text-left'  # 默认左对齐
            
            # 例如：数字右对齐，表头居中等
            if isinstance(cell.value, (int, float)):
                alignment = 'text-right'
                
            # 表头或左侧标题列居中
            if row_idx <= 3 or col_idx == 1:
                alignment = 'text-center'
            
            # 设置单元格样式和内容
            cell_style = f'class="{alignment}'
            if is_merged:
                cell_style += ' merged-cell'
            if rowspan > 1:
                cell_style += f'" rowspan="{rowspan}'
            if colspan > 1:
                cell_style += f'" colspan="{colspan}'
            cell_style += '"'
            
            # 处理单元格内容
            cell_content = "" if cell.value is None else str(cell.value)
            
            # 添加单元格到HTML
            html_content += f"<td {cell_style}>{cell_content}</td>"
        
        html_content += "</tr>"
    
    html_content += """
    </table>
    </body>
    </html>
    """
    
    # 保存HTML文件
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    # 设置字体配置
    font_config = FontConfiguration()
    
    # 使用WeasyPrint将HTML转换为PDF
    HTML(html_path).write_pdf(
        pdf_path,
        font_config=font_config
    )
