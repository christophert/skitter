#!/bin/bash

KEYSTORE_PASSWORD=$(cat private-pass)

# generate certificates
#/gocode/bin/cfssl gencert -remote=http://ca:8888 \
#    -hostname=authentication csr.json
curl -X POST -H "Content-Type: application/json" -d @csr.json \
    http://ca:8888/api/v1/cfssl/newkey > full_cert.json

# my jank method of extracting json content b/c it takes way too long to install
# modules (~5 minutes is to long) -- this is native to unix
extract_json_data () {
    cat full_cert.json | \
        grep -Po "\"$1\""':.*?[^\\]\",' | \
        sed 's/"'"$1"'":"//g' | \
        sed ':a;N;$!ba;s/\n/ /g' | \
        sed 's/",.*//' | \
        sed 's/\\n/\n/g' > $2
}
echo $KEYSTORE_PASSWORD
# make the private key and certificate request
extract_json_data certificate_request certificate.csr
extract_json_data private_key certificate.key

# generate public key cert request
openssl req -x509 -sha256 -new -key certificate.key \
    -out server.csr < certificate-settings

# export as pkcs12
openssl pkcs12 -export -name tomcat -in server.csr \
    -inkey certificate.key -out src/main/resources/keystore.p12 \
    -password pass:$KEYSTORE_PASSWORD

# make a keystore for our application and store it in the correct folder
#keytool -importkeystore -destkeystore src/main/resources/keystore.jks \
#    -srckeystore src/main/resources/keystore.p12 -srcstoretype pkcs12 \
#    -alias authentication-server -keypass $KEYSTORE_PASSWORD \
#    -storepass $KEYSTORE_PASSWORD -srckeypass $KEYSTORE_PASSWORD \
#    -destkeypass $KEYSTORE_PASSWORD < private-pass

# clean unessessary files
rm full_cert.json certificate.csr certificate.key server.csr 

# compile
mvn clean install

# run built spring environment1
java -Djava.security.egd=file:/dev/./urandom -jar \
    target/skitter-auth-1.0-SNAPSHOT.jar

# debugging
#java -jar target/skitter-auth-1.0-SNAPSHOT.jar --debug
