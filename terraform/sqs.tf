resource "aws_sqs_queue" "request_queue" {
  name                      = "tf_tesla_automation_scheduler_message_queue"
  delay_seconds             = 0         # default values
  max_message_size          = 262144    # default values
  message_retention_seconds = 345600    # default values
  receive_wait_time_seconds = 0         # default values
  visibility_timeout_seconds = 30       # default values

  kms_master_key_id                 = "alias/aws/sqs"   # default KMS key used to encrypt SQS messages
  kms_data_key_reuse_period_seconds = 300

  tags = {
    env = "${var.env}"
  }
}