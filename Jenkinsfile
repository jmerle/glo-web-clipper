pipeline {
    agent {
        docker "weboaks/node-karma-protractor-chrome:headless"
    }

    stages {
        stage("Install dependencies") {
            sh "yarn"
        }

        stage("Generate icons") {
            sh "yarn generate:icons"
        }

        stage("Generate API client") {
            sh "yarn generate:api"
        }

        stage("Build") {
            sh "yarn build"
        }

        stage("Lint code") {
            sh "yarn lint:code"
        }

        stage("Lint package") {
            sh "yarn lint:package"
        }
    }
}
