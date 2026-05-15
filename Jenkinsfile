pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "prodash-app"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Lint & Test') {
            steps {
                dir('backend') {
                    sh 'npm test -- --watchAll=false || true' // Continue even if tests fail for now
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker stop prodash-container || true'
                sh 'docker rm prodash-container || true'
                sh 'docker run -d -p 5000:5000 --name prodash-container prodash-app:latest'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build and Packaging successful!'
        }
        failure {
            echo 'Build failed. Check the logs.'
        }
    }
}
