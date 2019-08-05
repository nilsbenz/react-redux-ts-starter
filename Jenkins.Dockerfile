#
# Dockerfile for CI build environment.
#
FROM node:lts-jessie-slim

ARG HOST_UID
ARG HOST_GID
ARG HOST_DOCKER_VERSION
ARG HOST_TZ="Europe/Zurich"
ARG USER="jenkins"
ARG GROUP="jenkins"

ENV USER=$USER \
    GROUP=$GROUP \
    TZ=$HOST_TZ \
    DOCKER_VERSION=$HOST_DOCKER_VERSION

#
# Installation of necessary tools.
#
RUN groupadd -g $HOST_GID $USER && useradd -m -u $HOST_UID -g $USER $USER

#
# Preparation for build.
#
USER jenkins
WORKDIR /home/jenkins
