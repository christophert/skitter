#!/bin/bash
SSL_HOSTNAME="${SSL_HOSTNAME:-cache}"

# get CA Certificate
curl -XPOST -H "Content-Type: application/json" -d '{"label": "primary"}' http://ca:8888/api/v1/cfssl/info > ca.json

# get the SSL hostname from ENV
sed -i "s/cache.skitter.app/$SSL_HOSTNAME/g" csr.json

# get cert from CA
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
# make the private key and certificate request
extract_json_data ca.json certificate ca.crt
extract_json_data full_cert.json certificate /etc/ssl/cache.pem 
extract_json_data full_cert.json private_key certificate.key

cat ca.crt certificate.key >> /etc/ssl/cache.pem

# generate dhparam
if [ ! -f /etc/ssl/dhparam.pem ]; then
    openssl dhparam -out /etc/ssl/dhparam.pem 2048 2> /dev/null
fi

# clean unessessary files
rm ca.json full_cert.json ca.crt certificate.key 

# run nginx
/usr/sbin/nginx -g "daemon off;"
