variable "aws_region" {
  type = string
  default = "us-east-1"
}

variable "env" {
  type = string
  description = "Specify environment of which you are deploying. Specify either \"dev\" or \"prod\"."

  validation {
    condition     = var.env != null
    error_message = "You must specify an environment. Please enter \"dev\" or \"prod\"."
  }
}

variable "key_name" {
  type = string
  description = "Please enter the name of your Key Pair. Instructions to create a new Key Pair: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/getstarted-keypair.html"

  validation {
    condition     = var.key_name != null
    error_message = "You must specify a Key name."
  }
}