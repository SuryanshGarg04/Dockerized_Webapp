pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                // Checkout your repo
                git 'https://github.com/SuryanshGarg04/Dockerized_Webapp.git'
            }
        }

        stage('Build') {
            steps {
                // Simulate a build (in real life you'd do `npm install`, `docker build`, etc.)
                echo 'Building the project...'
            }
        }

        stage('Test') {
            steps {
                // Simulate tests
                echo 'Running tests (placeholder)...'
            }
        }

        stage('Deploy') {
            steps {
                // Simulate deploy
                echo 'Deploying application (placeholder)...'
            }
        }
    }
}
