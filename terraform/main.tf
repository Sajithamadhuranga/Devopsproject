# Specify AWS provider
provider "aws" {
  region = "eu-north-1"
}

# Create a Security Group allowing SSH and HTTP
resource "aws_security_group" "ec2_sg" {
  name        = "terraform-ec2-sg"
  description = "Allow SSH and HTTP access"
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # SSH access from anywhere
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # HTTP access for Nginx
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create an SSH Key Pair
resource "aws_key_pair" "terraform_key" {
  key_name   = "terraform-key"
  public_key = file("~/.ssh/id_rsa.pub")  # Make sure you have an SSH key
}

# Launch an EC2 instance
resource "aws_instance" "web" {
  ami           = "ami-09e67e426f25ce0d7"  # Amazon Linux 2 in eu-north-1
  instance_type = "t3.micro"
  key_name      = aws_key_pair.terraform_key.key_name
  security_groups = [aws_security_group.ec2_sg.name]

  # User data script to install Nginx
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install nginx1 -y
              systemctl enable nginx
              systemctl start nginx
              EOF

  tags = {
    Name = "MyEC2-EC2"
  }
}
