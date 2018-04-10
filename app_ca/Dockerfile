FROM cfssl/cfssl:latest

COPY ca.json /etc/cfssl
COPY config.json /etc/cfssl

RUN cfssl genkey -initca /etc/cfssl/ca.json | cfssljson -bare ca

EXPOSE 8888

ENTRYPOINT ["cfssl"]

CMD ["serve","-ca=ca.pem","-ca-key=ca-key.pem","-address=0.0.0.0"]  
