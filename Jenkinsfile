#!groovy
@Library("shared-libraries@v2.0.1") _

//
// Notification settings.
//
def SLACK_DOMAIN = "adcubum"
def SLACK_CHANNEL = "#mking-build"
def SLACK_TOKEN = "z4MN0likx2G9V2jbPmiJT8ZD"
def BUILD_INFO = "<${JOB_URL}|${JOB_NAME}> <${BUILD_URL}|#${BUILD_NUMBER}>" as String

pipeline {
    agent { docker { image "node:10" } }

    triggers { pollSCM("H/15 * * * *") }

    options { buildDiscarder(logRotator(numToKeepStr: "10", artifactNumToKeepStr: "10")) }

    environment {
        // CI is used in scripts to determine whether or not the script is executed on CI system.
        CI = 'true'
        HOME = '.'
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
                sh 'npm run test:coverage'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
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
