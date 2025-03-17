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
                    bat 'npm test -- --coverage --testResultsProcessor="jest-junit"'
                }
            }
        }

        stage('Archive Test & Coverage Reports') {
            steps {
                script {
                    // ✅ Check if the folder exists before creating it
                    bat 'if not exist coverage-report mkdir coverage-report'
                    bat 'xcopy /E /I /Y coverage coverage-report'
                }
                archiveArtifacts artifacts: 'coverage-report/**', fingerprint: true
                junit 'jest-junit.xml'
            }
        }
    }
}
