#!groovy
@Library("shared-libraries@v2.0.1") _

//
// Notification settings.
//
def SLACK_DOMAIN = "adcubum"
def SLACK_CHANNEL = "#mking-build"
def SLACK_TOKEN = "z4MN0likx2G9V2jbPmiJT8ZD"
def BUILD_INFO = "<${JOB_URL}|${JOB_NAME}> <${BUILD_URL}|#${BUILD_NUMBER}>" as String

//
// Pipeline Settings
//
def agentProjectLabel = 'adcubum-application'
def agentDockerLabel = 'docker'

//
// Jenkins Container
//
def jenkinsDockerfile = 'Jenkins.Dockerfile'
def jenkinsContainerCustomWorkspace = '/home/jenkins/workspaces/build'
def jenkinsContainerImageBuildArgs = '--build-arg HOST_UID=$(echo $UID) --build-arg HOST_GID=$(echo $UID) --build-arg HOST_TZ=$(echo $TZ) --build-arg HOST_DOCKER_VERSION=$(docker version -f \'{{.Server.Version}}\') '

pipeline {
    agent {
        label "${agentProjectLabel} && ${agentDockerLabel}"
    }

    triggers { pollSCM("H/15 * * * *") }

    options { buildDiscarder(logRotator(numToKeepStr: "10", artifactNumToKeepStr: "10")) }

    environment {
        // CI is used in scripts to determine whether or not the script is executed on CI system.
        CI = 'true'
    }

    stages {
        // Reduce Gradle wrapper start-overhead by running all stages in the same container.
        // This can be achieved by encapsulating all stages in one surrounding stage. By using the same container
        // the Gradle daemon can be activated to speed up subsequent Gradle executions in the stages.
        stage('Prepare Build Environment') {
            agent {
                dockerfile {
                    label "${agentProjectLabel} && ${agentDockerLabel}"

                    filename jenkinsDockerfile
                    //  Always attempt to pull a newer version of the base image using '--pull'.
                    additionalBuildArgs jenkinsContainerImageBuildArgs + ' --pull'

                    // DOCKER_HOST environment variable configures the Docker Daemon
                    // and is also used in com.bmuschko.gradle.docker.DockerExtension
                    args '--net host -e DOCKER_HOST="tcp://127.0.0.1:2375"'

                    reuseNode true
                    customWorkspace jenkinsContainerCustomWorkspace
                }
            }
            stages {
                stage('Checkout') {
                    steps {
                        step([$class: "StashNotifier"])
                        checkout scm
                    }
                }
                stage('Setup') {
                    steps {
                        sh 'npm install --quiet'
                    }
                }
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Test') {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage('Build') {
                    steps {
                        sh 'npm run build'
                    }
                }
            }
        }
    }

    post {
        regression {
            slackSend teamDomain: SLACK_DOMAIN, token: SLACK_TOKEN, channel: SLACK_CHANNEL, color: "danger", message: "Build broken: ${BUILD_INFO}"
        }
        fixed {
            slackSend teamDomain: SLACK_DOMAIN, token: SLACK_TOKEN, channel: SLACK_CHANNEL, color: "good", message: "Build fixed: ${BUILD_INFO}"
        }
        always {
            // Stash must be notified about the build status in order to display
            // the build result.
            script { currentBuild.result = currentBuild.result ?: "SUCCESS" }
            step([$class: "StashNotifier"])
        }
        cleanup {
            cleanWs()
        }
    }

}
