#!/bin/bash

while ! curl -s -k -u elastic:s00pers3cur3pa\$\$word https://skitdb:9200 > /dev/null; do echo waiting for elasticsearch; sleep 3; done;
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

extract_json_data ca.json certificate src/certs/ca.crt
extract_json_data full_cert.json certificate src/certs/certificate.crt
extract_json_data full_cert.json private_key src/certs/certificate.key

cat src/certs/ca.crt
cp src/certs/ca.crt /ca.crt
cat src/certs/certificate.crt

cat src/certs/ca.crt >> src/certs/certificate.crt

cd src
rails server
