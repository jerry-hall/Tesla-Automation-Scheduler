provider "aws" {
  region  = var.aws_region
}

terraform {
  version = ">= 0.13"
  backend "s3" {
    bucket = "jhall-tfstate"
    key    = "tesla-automation-scheduler/terraform.tfstate"
    region = "us-east-1"
  }
}