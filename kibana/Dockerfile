FROM docker.elastic.co/kibana/kibana:6.2.4

COPY build.sh /
COPY kibana.yml /usr/share/kibana/config/kibana.yml

USER root
RUN rm -rf /usr/share/kibana/ssl && mkdir /usr/share/kibana/ssl && chown kibana:kibana /usr/share/kibana/ssl
COPY csr.json /usr/share/kibana/ssl
USER kibana

CMD ["/bin/bash", "/build.sh"]
