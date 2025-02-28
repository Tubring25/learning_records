import boto3
from xhtml2pdf import pisa
from io import BytesIO


def lambda_handler(event, context):
    s3 = boto3.client("s3")

    bucket_name = "my-test-bucket-forpdf"
    html_key = "template.html"
    pdf_key = "output.pdf"

    try:
        response = s3.get_object(Bucket=bucket_name, Key=html_key)
        html_content = response["Body"].read().decode("utf-8")

        pdf_stream = BytesIO()
        pdf = pisa.CreatePDF(src=html_content, dest=pdf_stream, encoding="utf-8")

        if pdf.err:
            raise Exception("PDF convert failed: " + str(pdf.err))

        pdf_stream.seek(0)

        s3.upload_fileobj(
            Fileobj=pdf_stream,
            Bucket=bucket_name,
            Key=pdf_key,
            ExtraArgs={
                "ContentType": "application/pdf",
                "ACL": "bucket-owner-full-control",
            },
        )

        return {
            "statusCode": 200,
            "body": f"PDF successfully saved in://{bucket_name}/{pdf_key}",
        }

    except Exception as e:
        return {"statusCode": 500, "body": f"Error: {str(e)}"}
