#!/bin/bash

KEYSTORE_PASSWORD=$(cat private-pass)

# generate certificates
#/gocode/bin/cfssl gencert -remote=http://ca:8888 \
#    -hostname=authentication csr.json

# get CA Certificate
curl -XPOST -H "Content-Type: application/json" -d '{"label": "primary"}' \
    http://ca:8888/api/v1/cfssl/info > ca.json

curl -X POST -H "Content-Type: application/json" -d @csr.json \
    http://ca:8888/api/v1/cfssl/newcert > full_cert.json

# my jank method of extracting json content b/c it takes way too long to install
# modules (~5 minutes is to long) -- this is native to unix
extract_json_data () {
    cat $1 | \
        grep -Po "\"$2\""':.*?[^\\]\",' | \
        sed 's/"'"$2"'":"//g' | \
        sed ':a;N;$!ba;s/\n/ /g' | \
        sed 's/",.*//' | \
        sed 's/\\n/\n/g' > $3
}
echo $KEYSTORE_PASSWORD
# make the private key and certificate request
extract_json_data ca.json certificate ca.crt
extract_json_data full_cert.json certificate certificate.crt
extract_json_data full_cert.json private_key certificate.key

cat ca.crt
cat certificate.crt

cat ca.crt >> certificate.crt

# export as pkcs12
openssl pkcs12 -export -name tomcat -in certificate.crt \
    -inkey certificate.key -out src/main/resources/keystore.p12 \
    -password pass:$KEYSTORE_PASSWORD

# make a keystore for our application and store it in the correct folder
#keytool -importkeystore -destkeystore src/main/resources/keystore.jks \
#    -srckeystore src/main/resources/keystore.p12 -srcstoretype pkcs12 \
#    -alias authentication-server -keypass $KEYSTORE_PASSWORD \
#    -storepass $KEYSTORE_PASSWORD -srckeypass $KEYSTORE_PASSWORD \
#    -destkeypass $KEYSTORE_PASSWORD < private-pass

# clean unessessary files
rm ca.json full_cert.json ca.crt certificate.crt certificate.key 

# compile
mvn clean install -q

# run built spring environment1
java -Djava.security.egd=file:/dev/./urandom -jar \
    target/skitter-auth-1.0-SNAPSHOT.jar

# debugging
#java -jar target/skitter-auth-1.0-SNAPSHOT.jar --debug
