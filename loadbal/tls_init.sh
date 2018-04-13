#!/bin/bash

# get CA Certificate
curl -XPOST -H "Content-Type: application/json" -d '{"label": "primary"}' http://ca:8888/api/v1/cfssl/info > ca.json

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

extract_json_data ca.json certificate ca.crt
extract_json_data full_cert.json certificate /etc/ssl/haproxy.pem
extract_json_data full_cert.json private_key /etc/ssl/haproxy.key

cat ca.crt /etc/ssl/haproxy.key >> /etc/ssl/haproxy.pem

rm ca.json full_cert.json ca.crt
