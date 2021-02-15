provider "aws" {
  region  = var.aws_region
}

terraform {
  backend "s3" {
    bucket = "jhall-tfstate"
    key    = "tesla-automation-scheduler/terraform.tfstate"
    region = "us-east-1"
  }
}