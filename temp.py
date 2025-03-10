<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# 

---

# ok 请告诉我如何在Windows上通过Docker来构建

以下是在Windows系统上使用Docker构建适用于AWS Lambda的Spire.XLS Python依赖包的详细步骤：

## 前置条件

- 安装Docker Desktop for Windows
- 确认Docker已启动并正常运行

---

## 步骤1：准备Dockerfile

在本地创建一个文件夹（例如：`lambda-layer-build`），并在其中创建一个名为`Dockerfile`的文件，内容如下：

```dockerfile
FROM public.ecr.aws/lambda/python:3.9

# 安装必要的工具和字体
RUN yum install -y unzip fontconfig && \
    yum clean all

# 安装常用字体，以避免字体缺失问题
RUN yum install -y dejavu-sans-fonts dejavu-serif-fonts && \
    yum clean all

# 设置工作目录
WORKDIR /layer

# 安装Spire.XLS依赖
RUN pip install Spire.Xls -t python/lib/python3.9/site-packages

# 打包成zip文件
RUN zip -r /tmp/spirexls-layer.zip python

# 默认命令（容器启动后不做任何操作）
CMD ["bash"]
```

---

## 构建步骤

### 1. 创建项目目录结构

在本地Windows系统任意位置新建一个文件夹，例如`C:\spirexls-layer`，并进入该目录。

目录结构：

```
C:\spirexls-layer\
    └─ Dockerfile
```

将上述Dockerfile内容保存为名为`Dockerfile`的文件（注意不要带任何扩展名）。

### 2. 构建Docker镜像

打开Windows命令提示符或PowerShell，进入刚才创建的目录，执行命令：

```bash
docker build -t spirexls-layer .
```


### 2. 启动容器并安装Spire.XLS依赖

构建完成后，启动容器：

```bash
docker run -it --name spirexls-container spirexls-layer bash
```

现在你已经进入了容器内部环境，接下来执行：

```bash
mkdir -p python/lib/python3.9/site-packages
pip install Spire.Xls boto3 -t python/lib/python3.9/site-packages
```

> 注意：
> 请确认Lambda使用的Python版本（如Python 3.9），并相应修改路径中的python版本号。

### 3. 打包依赖到zip文件（在容器内执行）

```bash
zip -r /tmp/spirexls_layer.zip python/
```


### 4. 从容器中复制zip文件到宿主机（在宿主机上执行）

打开另一个Windows终端窗口，执行：

```bash
docker cp spirexls-container:/tmp/spirexls_layer.zip C:\spirexls-layer\
```

现在，你会在本地目录`C:\spirexls-layer\`中看到生成的`spirexls_layer.zip`文件。

---

## 上传到AWS Lambda Layer

1. 登录AWS控制台，进入Lambda服务。
2. 点击左侧菜单中的“Layers”。
3. 点击“Create layer”，上传刚刚生成的zip文件。
4. 选择兼容运行时（如Python 3.9），保存Layer。

---

## 在Lambda函数中使用该Layer

- 在Lambda函数配置中添加刚才创建的Layer。
- 在Lambda函数代码中直接导入Spire.XLS库即可正常使用。

---

## 示例Lambda函数代码片段：

```python
import boto3
import os
import io
from spire.xls import Workbook, FileFormat

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    
    source_bucket = event['source_bucket']
    source_key = event['source_key']
    target_bucket = event['target_bucket']
    target_key = event['target_key']

    # 下载Excel文件到内存中
    excel_file_obj = s3.get_object(Bucket=source_bucket, Key=source_key)
    excel_bytes = io.BytesIO(excel_content := excel_file['Body'].read())

    workbook = Workbook()
    workbook.LoadFromStream(io.BytesIO(excel_content))
    
    # 转换为PDF并保存到内存流中
    pdf_stream = io.BytesIO()
    workbook.SaveToStream(pdf_stream, FileFormat.PDF)
    workbook.Dispose()
    
    pdf_stream.seek(0)
    
    # 上传PDF到S3目标位置
    s3.put_object(Bucket=target_bucket, Key=target_key, Body=pdf_stream.getvalue())
    
    return {
        'statusCode': 200,
        'body': f'File converted and uploaded to {target_bucket}/{target_key}'
    }
```

---

## 注意事项与提示：

- Lambda环境默认缺少字体，建议安装常用字体（如DejaVu系列）以避免转换时出现字体缺失问题。
- 确保Lambda函数内存至少设置为512MB以上，以避免内存不足导致转换失败。
- Lambda超时时间建议设置足够长（例如30秒或更长），以处理大文件转换。

通过以上步骤，你可以在Windows上使用Docker轻松构建出适用于AWS Lambda Python环境的Spire.XLS依赖层，从而顺利实现Excel高精度转换为PDF或HTML。

