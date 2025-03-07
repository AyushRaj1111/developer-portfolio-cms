# AWS Setup for Developer Portfolio CMS

This guide will help you set up the necessary AWS services for deploying the Developer Portfolio CMS. We will be using AWS Amplify, EC2, RDS, S3, Redis, and Cloudflare.

## Prerequisites

- AWS account
- AWS CLI installed and configured
- Docker installed
- Kubernetes cluster (EKS or any other managed Kubernetes service)

## Step 1: Set up AWS Amplify

1. Go to the AWS Amplify Console.
2. Click on "Get Started" under "Deploy".
3. Connect your GitHub repository.
4. Choose the branch you want to deploy.
5. Configure the build settings if needed.
6. Click "Save and Deploy".

## Step 2: Set up EC2

1. Go to the EC2 Dashboard.
2. Click on "Launch Instance".
3. Choose an Amazon Machine Image (AMI).
4. Choose an instance type.
5. Configure instance details.
6. Add storage.
7. Add tags (optional).
8. Configure security group.
9. Review and launch the instance.

## Step 3: Set up RDS

1. Go to the RDS Dashboard.
2. Click on "Create database".
3. Choose a database creation method.
4. Choose a database engine (PostgreSQL).
5. Configure the database settings.
6. Configure the instance specifications.
7. Configure storage.
8. Configure connectivity.
9. Add tags (optional).
10. Configure backup and maintenance settings.
11. Review and create the database.

## Step 4: Set up S3

1. Go to the S3 Dashboard.
2. Click on "Create bucket".
3. Enter a bucket name.
4. Choose a region.
5. Configure bucket settings.
6. Review and create the bucket.

## Step 5: Set up Redis

1. Go to the ElastiCache Dashboard.
2. Click on "Create".
3. Choose Redis.
4. Configure the cluster settings.
5. Configure the node type.
6. Configure the number of replicas.
7. Configure the security group.
8. Review and create the cluster.

## Step 6: Set up Cloudflare

1. Go to the Cloudflare Dashboard.
2. Add your site to Cloudflare.
3. Update your domain's nameservers to Cloudflare's nameservers.
4. Configure DNS settings.
5. Configure SSL/TLS settings.
6. Configure caching settings.
7. Configure firewall rules (optional).

## Step 7: Set up CI/CD pipeline

1. Create a `.github/workflows` directory in your repository.
2. Create a `ci-cd-pipeline.yml` file in the `.github/workflows` directory.
3. Add the following content to the `ci-cd-pipeline.yml` file:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v1

    - name: Log in to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v1

    - name: Build and push Docker image
      run: |
        docker build -t ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY }}:latest .
        docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY }}:latest

    - name: Deploy to Kubernetes
      uses: appleboy/ssh-action@v0.1.3
      with:
        host: ${{ secrets.K8S_HOST }}
        username: ${{ secrets.K8S_USERNAME }}
        key: ${{ secrets.K8S_SSH_KEY }}
        script: |
          kubectl set image deployment/frontend-deployment frontend=${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY }}:latest
          kubectl set image deployment/backend-deployment backend=${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY }}:latest
```

4. Commit and push the changes to your repository.

## Conclusion

You have successfully set up the necessary AWS services and CI/CD pipeline for deploying the Developer Portfolio CMS. You can now manage your blogs, projects, learning progress, achievements, and experiences dynamically.

