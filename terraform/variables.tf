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