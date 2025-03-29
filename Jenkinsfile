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
                    bat 'mkdir  coverage-report'
                    bat 'xcopy /E /I /Y coverage coverage-report'
                }
                archiveArtifacts artifacts: 'coverage-report/**', fingerprint: true
                junit 'jest-junit.xml'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    bat 'sonar-scanner -Dsonar.projectKey=node-ci-project'
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
                    withDockerRegistry(credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/') {
                        bat "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }
        stage('Check Kubernetes Connection') {
            steps {
                script {
                    bat "kubectl get nodes"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    bat """
                    kubectl set image deployment/node-ci-project node-ci-project=${DOCKER_IMAGE}:${DOCKER_TAG} --record
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    bat """
                    echo "Checking if pods are running..."
                    kubectl rollout status deployment/node-ci-project --timeout=60s
                    echo "Getting list of pods..."
                    kubectl get pods -n ${K8S_NAMESPACE}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed. Check logs!"
        }
    }
}
