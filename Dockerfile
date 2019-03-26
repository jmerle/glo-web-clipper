FROM weboaks/node-karma-protractor-chrome:headless

USER root

RUN apt update && apt install -y openjdk-8-jre-headless
