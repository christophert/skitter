# this script tests to see if csrf is working for spring
curl --fail -k -o out.dat -X POST 'https://authentication:8080/auth/register' \
    -d '{"email":"test", "firstName": "test", "lastName" : "test"}'
httpStatus=$(head -1 headers.txt | awk '{print $2}')
contentType=$(grep "Content-Type:" headers.txt | tr -d '\r')
contentType=${contentType#*: }
if [ "$httpStatus" == "403" ]; then
   echo "GOOD - HTTP STATUS $httpStatus"
else
    echo $httpStatus
   echo "FAILED"
   exit 403
fi
