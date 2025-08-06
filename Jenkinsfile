pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/SuryanshGarg04/Dockerized_Webapp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build('dockerized-webapp')
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Run tests here'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy step here'
            }
        }
    }
}

        }

        stage('Test') {
            steps {
                echo 'Run unit/integration tests here if available.'
            }
        }

        stage('Deploy') {
            steps {
                echo 'You can push to DockerHub here or run docker run...'
            }
        }
    }
}
