import boto3
import os
import tempfile
from xlsx2html import xlsx2html
from weasyprint import HTML

s3 = boto3.client("s3")

def lambda_handler(event, context):
    bucket_name = "my-test-bucket-forpdf"
    excel_key = "test-file.xlsx"
    pdf_key = excel_key.rsplit(".", 1)[0] + ".pdf"

    # 创建临时目录
    temp_dir = tempfile.mkdtemp()
    excel_path = os.path.join(temp_dir, "input.xlsx")
    html_path = os.path.join(temp_dir, "output.html")
    pdf_path = os.path.join(temp_dir, "output.pdf")

    try:
        # 从 S3 下载 Excel 文件
        s3.download_file(bucket_name, excel_key, excel_path)

        # 将 Excel 转换为 HTML
        with open(html_path, "w", encoding="utf-8") as html_file:
            xlsx2html(excel_path, html_file)

        # 将 HTML 转换为 PDF
        HTML(html_path).write_pdf(pdf_path)

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
        if os.path.exists(excel_path):
            os.remove(excel_path)
        if os.path.exists(html_path):
            os.remove(html_path)
        if os.path.exists(pdf_path):
            os.remove(pdf_path)
        os.rmdir(temp_dir)
