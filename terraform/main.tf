terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Upload your public key to AWS
resource "aws_key_pair" "quotevault" {
  key_name   = var.key_name
  public_key = file("~/.ssh/quotevault-key.pub")
}

# Security group — open port 22 (SSH) and 3000 (app)
resource "aws_security_group" "quotevault_sg" {
  name        = "quotevault-sg"
  description = "Allow SSH and app traffic"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "App port"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 instance
resource "aws_instance" "quotevault" {
  ami                    = "ami-0c02fb55956c7d316" # Amazon Linux 2 us-east-1
  instance_type          = var.instance_type
  key_name               = aws_key_pair.quotevault.key_name
  vpc_security_group_ids = [aws_security_group.quotevault_sg.id]
  associate_public_ip_address = true 

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    yum install -y docker
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ec2-user
  EOF

  tags = {
    Name = "quotevault-cicd"
  }
}