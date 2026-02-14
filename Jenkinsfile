pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '1'
        DOCKERHUB_CREDS = 'dockerhub-creds'
        DOCKERHUB_USER = 'sajithamaduranga'
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/devops_frontend_image:latest"
        BACKEND_IMAGE  = "${DOCKERHUB_USER}/devops_backend_image:latest"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                echo "Cloning GitHub repository..."
                checkout scm
            }
        }

        stage('Build Docker Images') {
            parallel {

                stage('Build Backend Image') {
                    steps {
                        echo "Building backend image..."
                        sh "docker build -t ${BACKEND_IMAGE} ./backend"
                    }
                }

                stage('Build Frontend Image') {
                    steps {
                        echo "Building frontend image..."
                        sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
                    }
                }

            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo "Logging into Docker Hub..."

                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKERHUB_CREDS}",
                        usernameVariable: 'DH_USER',
                        passwordVariable: 'DH_PASS'
                    )
                ]) {

                    sh '''
                        echo $DH_PASS | docker login -u $DH_USER --password-stdin
                        docker push ${BACKEND_IMAGE}
                        docker push ${FRONTEND_IMAGE}
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy on EC2 using Docker Compose') {
            steps {
                echo "Deploying containers..."

                sh '''
                    docker-compose down --remove-orphans || true
                    docker-compose pull
                    docker-compose up -d --force-recreate
                '''
            }
        }

    }

    post {

        success {
            echo " Deployment Successful!"
        }

        failure {
            echo " Deployment Failed!"
        }

        always {
            echo "Cleaning unused images..."
            sh 'docker image prune -af || true'
        }

    }
}
