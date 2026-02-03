pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws_access_key_id')
        AWS_SECRET_ACCESS_KEY = credentials('aws_secret_access_key')
        TERRAFORM_DIR         = 'terraform'
        SSH_KEY_PATH          = '~/.ssh/id_rsa'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Sajithamadhuranga/Devopsproject.git'
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                dir("${TERRAFORM_DIR}") {
                    sh '''
                    terraform init
                    terraform plan -out=tfplan
                    terraform apply -auto-approve tfplan
                    '''
                }
            }
        }

        stage('Get EC2 Public IP') {
            steps {
                script {
                    EC2_IP = sh(
                        script: "terraform -chdir=${TERRAFORM_DIR} output -raw ec2_public_ip",
                        returnStdout: true
                    ).trim()
                    echo "EC2 Public IP: ${EC2_IP}"
                }
            }
        }

        stage('Deploy App to EC2') {
            steps {
                script {
                    sh "./deploy.sh ${EC2_IP} ${SSH_KEY_PATH}"
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "You can now access the app at http://${EC2_IP}"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Full Deployment Completed!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
