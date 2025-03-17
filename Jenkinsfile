pipeline {
    agent any

    stages {
        stage('Build & Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Security Audit') {
            steps {
                script {
                    sh 'npm audit --json > audit-report.json || true'
                }
            }
        }

        stage('Run Unit Tests & Code Coverage') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }
    }
}
