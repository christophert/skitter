FROM haproxy:alpine

RUN apk add --no-cache bash openssl curl grep

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
COPY csr.json /
COPY build.sh /

ENTRYPOINT ["/build.sh"]
CMD ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg"]
