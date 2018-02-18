# use alpine image
FROM alpine:latest

RUN apk update && \
    apk upgrade && \
    apk add --update openssl nginx && \
    apk add --update tzdata

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY www /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]
