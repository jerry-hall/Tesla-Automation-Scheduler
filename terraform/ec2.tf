data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]     # Canonical
}

resource "aws_instance" "master-node" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"    # Use t2.micro to start, can increase as req'd
  user_data     = var.env == "dev" ? file("./scripts/dev/user_data.sh") : file("./scripts/prod/user_data_master.sh")
  key_name      = var.key_name

  tags = {
    Name = "TAS-master"
  }
}

resource "aws_instance" "worker-node" {
  count = var.env == "prod" ? 1 : 0
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"    # Use t2.micro to start, can increase as req'd
  user_data     = file("./scripts/prod/user_data_worker.sh")
  key_name      = var.key_name

  tags = {
    Name = "TAS-worker"
  }
}