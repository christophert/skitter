FROM node:carbon

WORKDIR /usr/src/app
COPY skitterapp/build ./build
COPY build.sh /
COPY csr.json /

EXPOSE 80

ENTRYPOINT ["/build.sh"]
