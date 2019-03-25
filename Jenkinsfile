pipeline {
    agent {
        docker "weboaks/node-karma-protractor-chrome:headless"
    }

    stages {
        stage("Install dependencies") {
            steps {
                sh "yarn"
            }
        }

        stage("Generate icons") {
            steps {
                sh "yarn generate:icons"
            }
        }

        stage("Generate API client") {
            steps {
                sh "yarn generate:api"
            }
        }

        stage("Build") {
            steps {
                sh "yarn build"
            }
        }

        stage("Lint code") {
            steps {
                sh "yarn lint:code"
            }
        }

        stage("Lint package") {
            steps {
                sh "yarn lint:package"
            }
        }
    }
}
