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
openssl pkcs12 -export -name elasticsearchssl -in certificate.crt \
    -inkey certificate.key -out /usr/share/elasticsearch/elasticsearch-5.2.2/config/keystore.p12 \
    -password pass:$KEYSTORE_PASSWORD


# make a keystore for our application and store it in the correct folder
keytool -importkeystore -destkeystore /usr/share/elasticsearch/elasticsearch-5.2.2/config/keystore.jks \
    -srckeystore /usr/share/elasticsearch/elasticsearch-5.2.2/config/keystore.p12 -srcstoretype pkcs12 \
    -alias elasticsearchssl -keypass $KEYSTORE_PASSWORD \
    -storepass $KEYSTORE_PASSWORD -srckeypass $KEYSTORE_PASSWORD \
    -destkeypass $KEYSTORE_PASSWORD < private-pass

cp certificate.key /usr/share/elasticsearch/elasticsearch-5.2.2/config/certificate.key
cp certificate.crt /usr/share/elasticsearch/elasticsearch-5.2.2/config/certificate.crt
cp ca.crt /usr/share/elasticsearch/elasticsearch-5.2.2/config/ca.crt
# clean unessessary files
chmod -R 777 ./
# run elasticsearch
chown -R elastic:elastic ./
sudo -H -u elastic /bin/bash -c /usr/share/elasticsearch/elasticsearch-5.2.2/bin/elasticsearch

