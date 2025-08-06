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
                echo 'Running tests... (placeholder)'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying app... (placeholder)'
            }
        }
    }
}
