pipeline {
    agent any
    environment {
        SONAR_SCANNER_HOME = tool 'SonarQube'
    }
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

        stage('SAST-SonarQubeAnalayses') {
            steps {
                bat '''
                    "%SONAR_SCANNER_HOME%\\bin\\sonar-scanner.bat" -D"sonar.projectKey=node-ci" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=sqp_1a5282d36801648ac3376c9b00f30c5f5b0db3ef"
                '''
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t my-node-app:latest .'
                }
            }
        }
    }
}