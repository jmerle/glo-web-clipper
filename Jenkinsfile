pipeline {
    agent any

    stages {
        stage("Quality Assurance") {
            agent {
                dockerfile true
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
                        sh "yarn build:firefox"
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

        stage("Analysis") {
            agent {
                docker {
                    image "noenv/node-sonar-scanner"
                    args "--network web"
                }
            }

            when {
                branch "master"
            }

            steps {
                withSonarQubeEnv("sonar.jmerle.dev") {
                    sh "sonar-scanner"
                }
            }
        }
    }
}
