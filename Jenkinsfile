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
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Parallel must be used as a top-level stage block like this:
        stage('Build & Tag Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        sh "docker build -t ${BACKEND_IMAGE} ./backend"
                    }
                }
                stage('Build Frontend') {
                    steps {
                        sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
                    }
                }
            }
        }


        stage('Push Images to Docker Hub') {
            steps {
                echo 'Logging into Docker Hub and pushing images...'
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh 'echo $DH_PASS | docker login -u $DH_USER --password-stdin'
                    sh "docker push ${BACKEND_IMAGE}"
                    sh "docker push ${FRONTEND_IMAGE}"
                    sh 'docker logout'
                }
            }
        }


        stage('Deploy Containers') {
            steps {
                script {
                    echo 'Cleaning up and deploying...'
                    sh 'docker-compose down --remove-orphans || true'
                    sh 'docker-compose pull'
                    sh 'docker-compose up -d'
                }
            }
        }
    }


    post {
        success {
            echo "✅ Full Deployment Completed Successfully!"
        }
        failure {
            echo "❌ Deployment Failed. Check the console logs."
        }
        always {
            sh 'docker image prune -f || true'
        }
    }
}