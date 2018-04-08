FROM openjdk:8-jdk-alpine

MAINTAINER Joseph Bartelmo <jfb3657>
MAINTAINER Christopher Tran <ctt1414>

VOLUME /tmp

ADD ./target/skitter-auth-1.0-SNAPSHOT.jar auth.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/auth.jar"]
