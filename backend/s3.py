import boto3
from botocore.exceptions import NoCredentialsError
from fastapi import HTTPException, UploadFile
from typing import List

class S3Client:
    def __init__(self, aws_access_key_id: str, aws_secret_access_key: str, bucket_name: str, region_name: str = 'us-east-1'):
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
            region_name=region_name
        )
        self.bucket_name = bucket_name

    def upload_file(self, file: UploadFile, file_name: str) -> str:
        try:
            self.s3.upload_fileobj(file.file, self.bucket_name, file_name)
            return f"https://{self.bucket_name}.s3.amazonaws.com/{file_name}"
        except NoCredentialsError:
            raise HTTPException(status_code=403, detail="Credentials not available")

    def delete_file(self, file_name: str):
        try:
            self.s3.delete_object(Bucket=self.bucket_name, Key=file_name)
        except NoCredentialsError:
            raise HTTPException(status_code=403, detail="Credentials not available")

    def list_files(self) -> List[str]:
        try:
            response = self.s3.list_objects_v2(Bucket=self.bucket_name)
            if 'Contents' in response:
                return [item['Key'] for item in response['Contents']]
            return []
        except NoCredentialsError:
            raise HTTPException(status_code=403, detail="Credentials not available")
