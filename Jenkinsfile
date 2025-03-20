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
                    bat 'if not exist coverage-report mkdir coverage-report'
                    bat 'xcopy /E /I /Y coverage coverage-report'
                }
                archiveArtifacts artifacts: 'coverage-report/**', fingerprint: true
                junit 'jest-junit.xml'
            }
        }

        stage('SAST-SonarQubeAnalayses') {
            steps {
                script {
                    echo "Hello SAST"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Dynamically set the Docker image tag
                    def dockerTag = env.GIT_COMMIT ?: "latest"
                    echo "Building Docker image with tag: ${dockerTag}"
                    
                    // Execute the Docker build command
                    bat "docker build -t aziz224/my-docker-repo:${dockerTag} ."
                }
            }
        }

        stage('pushing docker image ') {
            steps {
                script {
                    // Dynamically set the Docker image tag
                    withDockerRegistry(credentialsId: 'dokcer-hub-credentials', url: "") {
                        def dockerTag = env.GIT_COMMIT ?: "latest"
                        echo "Building Docker image with tag: ${dockerTag}"
                        bat "docker push  aziz224/my-docker-repo:${dockerTag} "
                    }
                }

            }
        }
    }
}