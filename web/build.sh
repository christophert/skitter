#!/bin/bash

# get CA Certificate
curl -XPOST -H "Content-Type: application/json" -d '{"label": "primary"}' http://ca:8888/api/v1/cfssl/info > ca.json

curl -XPOST -H "Content-Type: application/json" -d @csr.json \
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
# make the private key and certificate request
extract_json_data ca.json certificate ca.crt
extract_json_data full_cert.json certificate certificate.crt
extract_json_data full_cert.json private_key certificate.key

cat ca.crt
cat certificate.crt

cat ca.crt >> certificate.crt

# clean unessessary files
rm ca.json full_cert.json ca.crt 

npm i && npm start
