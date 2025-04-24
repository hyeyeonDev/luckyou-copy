pipeline {
    agent any
    environment {
        // SERVICE_URL = 'http://43.201.146.143:8080/api/test/jenkins'
        SERVICE_URL = 'https://api.luckyou.kro.kr/api/test/jenkins'
    }
    stages {
        stage('Build Backend') {
            steps {
                dir('be') {
                    withCredentials([file(credentialsId: 'be-application', variable: 'APP_YML')]) {
                        sh '''
                            rm src/main/resources/application.yml
                            cp $APP_YML src/main/resources/application.yml
                        '''
                    }
                    sh './gradlew clean bootJar || { echo "Backend build failed"; exit 1; }'
                    sh 'test -f build/libs/luckYou.jar || { echo "luckYou.jar not found"; exit 1; }'
                }
            }
        }
        stage('Build Frontend') {
            tools {
                nodejs 'Node20'
            }
            steps {
                dir('fe') {
                    withCredentials([file(credentialsId: 'fe-env', variable: 'ENV_FILE')]) {
                        sh '''
                            rm -f .env
                            cp $ENV_FILE .env
                        '''
                    }
                }
            }
        }
        stage('Docker Build & Test') {
            steps {
                sh 'docker-compose up -d --build'
                sh 'sleep 30'
                sh 'docker-compose ps'
                sh 'docker-compose logs backend || true'
                timeout(time: 5, unit: 'MINUTES') {
                    sh """
                        until curl -f ${SERVICE_URL}; do
                            echo "Waiting for service..."
                            sleep 2
                        done
                        echo "Service is up!"
                    """
                }
            }
        }
        stage('Cleanup') {
            when {
                expression { currentBuild.result == 'FAILURE' }
            }
            steps {
                sh 'docker-compose down --volumes'
            }
        }
    }
    post {
        always {
            sh 'docker-compose logs > docker_logs.txt || echo "Failed to collect logs"'
            archiveArtifacts artifacts: 'docker_logs.txt', allowEmptyArchive: true
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}