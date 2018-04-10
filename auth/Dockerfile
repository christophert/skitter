FROM maven:alpine

MAINTAINER Joseph Bartelmo <jfb3657>
MAINTAINER Christopher Tran <ctt1414>

VOLUME /tmp

ADD ./src src
ADD ./pom.xml pom.xml

RUN mvn clean install

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/target/skitter-auth-1.0-SNAPSHOT.jar"]
