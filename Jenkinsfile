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
                sh 'docker build -t dockerized-webapp .'
            }
        }

        stage('Test') {
            steps {
                echo 'Test step goes here'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy step goes here'
            }
        }
    }
}
