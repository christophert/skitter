# use alpine image
FROM alpine:latest

RUN apk update && \
    apk upgrade && \
    apk add --update openssl nginx && \
    apk add --update tzdata grep bash curl

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY csr.json /
COPY build.sh /

RUN mkdir -p /usr/share/nginx/cache

EXPOSE 80 443

ENTRYPOINT ["/build.sh"]
