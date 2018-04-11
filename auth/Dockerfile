FROM goyalzz/ubuntu-java-8-maven-docker-image


MAINTAINER Joseph Bartelmo <jfb3657>
MAINTAINER Christopher Tran <ctt1414>

VOLUME /tmp
RUN apt-get update && apt-get install curl -y
# install cfssl and go
# below is super slow, bash approach was used instead with curl, included with
# maven:alpine, otherwise use goyalzz/ubuntu-java-8-maven-docker-image
#RUN mkdir -p /gocode/bin
#ENV GOPATH /gocode
#RUN wget -q https://storage.googleapis.com/golang/go1.10.1.linux-amd64.tar.gz \
#         -O go.tar
#RUN tar -xf go.tar && mv go /usr/share/go
#RUN apt-get update && apt-get upgrade -y && apt-get install gcc -y
#RUN /usr/share/go/bin/go get -u github.com/cloudflare/cfssl/cmd/cfssl

# build the spring module
ADD ./ ./
# copy over credentials for certificate
COPY ./csr.json csr.json
# build file will make certificate and run the jar
COPY ./build.sh build.sh
# to download all packages
RUN mvn clean install
ENTRYPOINT ["/bin/bash","build.sh"]
