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
                    bat 'npm test -- --coverage'
                }
            }
        }

        stage('Archive Code Coverage') {
            steps {
                script {
                    bat 'mkdir coverage-report'
                    bat 'xcopy /E /I /Y coverage coverage-report'
                }
                archiveArtifacts artifacts: 'coverage-report/**', fingerprint: true
            }
        }
    }

    post {
        always {
            junit '**/coverage/**/lcov-report/index.html'
        }
    }
}
