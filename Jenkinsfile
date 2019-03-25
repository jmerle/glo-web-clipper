pipeline {
    agent {
        docker {
            image "weboaks/node-karma-protractor-chrome:headless"
            args "-v /var/run/docker.sock:/var/run/docker.sock"
        }
    }

    stages {
        stage("Install dependencies") {
            steps {
                sh "yarn install --frozen-lockfile"
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
