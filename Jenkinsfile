pipeline {
    agent any

    environment {
        // BuildKit speeds up Docker builds significantly
        DOCKER_BUILDKIT = '1' 
        DOCKERHUB_CREDS = 'dockerhub-creds'
        DOCKERHUB_USER = 'sajithamaduranga'
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/devops_frontend_image:latest"
        BACKEND_IMAGE  = "${DOCKERHUB_USER}/devops_backend_image:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                // Ensure we have the latest code
                checkout scm
            }
        }

        stage('Build & Tag Images') {
            steps {
                echo 'Building and tagging images...'
                // Using parallel builds can prevent the frontend build from blocking the backend
                parallel(
                    "Backend": {
                        sh "docker build -t ${BACKEND_IMAGE} ./backend"
                    },
                    "Frontend": {
                        sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
                    }
                )
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
                    echo 'Cleaning up old containers...'
                    // '|| true' ensures the pipeline doesn't stop if there's nothing to clean up
                    sh 'docker-compose down --remove-orphans || true'
                    
                    echo 'Deploying latest version...'
                    // Force pull to ensure we don't use old local image caches
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
            echo "❌ Deployment Failed. Check the console logs for specific errors."
        }
        always {
            // Optional: Clean up images after build to save disk space on EC2
            echo "Cleaning up dangling images..."
            sh 'docker image prune -f || true'
        }
    }
}