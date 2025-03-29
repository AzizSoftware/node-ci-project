pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = tool 'SonarQube'
        DOCKER_IMAGE = "aziz244/my-docker-repo"
        DOCKER_TAG = "${env.GIT_COMMIT ?: 'latest'}"

        K8S_NAMESPACE = 'default'
    }

    stages {
        
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/AzizSoftware/node-ci-project.git'
            }
        }

        stage('Install Dependencies') {
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

        stage('Archive Test Reports') {
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

        stage('SonarQube Analysis') {
            steps {
                script{
                    echo "sonar tests"
                }
            }
            
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                     withDockerRegistry(credentialsId: 'dokcer-hub-credentials', url: 'https://index.docker.io/v1/') {
                        def dockerTag = env.GIT_COMMIT ?: "latest"
                        echo "Pushing Docker image with tag: ${dockerTag}"
                        
                        // Push the Docker image
                        bat "docker push aziz244/my-docker-repo:${dockerTag}"
                    }
                }
            }
        }
        stage('Check Kubernetes Connection') {
            steps {
                script {
                    echo "kubernetes"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "hello"
                }
            }
        }

    }

    
}
