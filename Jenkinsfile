pipeline {
    agent {
        docker { image 'node:18-alpine' } // Example docker image; change as needed
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker --version'
                    sh 'docker build -t dockerized-webapp .'
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 --name webapp dockerized-webapp'
                }
            }
        }
    }
}
