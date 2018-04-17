# use alpine image
FROM alpine:latest

RUN apk update && \
    apk upgrade && \
    apk add --update openssl nginx && \
    apk add --update tzdata grep curl bash

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY build.sh /
COPY csr.json /

EXPOSE 80 443

ENTRYPOINT ["/build.sh"]
