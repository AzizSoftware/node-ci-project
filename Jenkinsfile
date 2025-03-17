pipeline {
    agent any

    stages {
        stage('Build & Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }

        stage('Security Audit') {
            steps {
                script {
                    bat 'npm audit --json > audit-report.json || true'
                }
            }
        }

        stage('Run Unit Tests & Code Coverage') {
            steps {
                script {
                    bat 'npm test'
                }
            }
        }
        stage("code coverage"){
            steps{
                bat 'npm run coverage'
            }
        }
    }
}
