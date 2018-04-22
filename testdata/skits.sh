#!/bin/bash

#
# This script demonstrates how inner microserves will be expecting requests.
# In addition it will let us have startup test data to play around with.
#

curl -k -X POST -d '{"msg":"This is the 1 skit"}'\
     --header "Content-Type: application/json" \
     --header "X-SKITTER-AUTH-USER: jfb3657" \
     --header "X-SKITTER-AUTH-NAME: Joe Bartelmo" \
     --header "Accept: */*" \
    https://skitcreate:81/skits/AddSkit

curl -k -X POST -d '{"msg":"This is the 2 skit"}'\
     --header "Content-Type: application/json" \
     --header "X-SKITTER-AUTH-USER: ctt1414" \
     --header "X-SKITTER-AUTH-NAME: Christopher Tran" \
     --header "Accept: */*" \
    https://skitcreate:81/skits/AddSkit

curl -k -X POST -d '{"msg":"This is the 6 skit"}'\
     --header "Content-Type: application/json" \
     --header "X-SKITTER-AUTH-USER: ctt1414" \
     --header "X-SKITTER-AUTH-NAME: Your Old Name" \
     --header "Accept: */*" \
    https://skitcreate:81/skits/AddSkit

curl -k -X POST -d '{"msg":"This is the 7 skit"}'\
     --header "Content-Type: application/json" \
     --header "X-SKITTER-AUTH-USER: ctt1414" \
     --header "X-SKITTER-AUTH-NAME: Your Old Name" \
     --header "Accept: */*" \
    https://skitcreate:81/skits/AddSkit

curl -k -X POST -d '{"msg":"This is the 3 skit"}'\
     --header "Content-Type: application/json" \
     --header "X-SKITTER-AUTH-USER: jfb3657" \
     --header "X-SKITTER-AUTH-NAME: Joe Bartelmo" \
     --header "Accept: */*" \
    https://skitcreate:81/skits/AddSkit

curl -k -X POST -d '{"msg":"This is the 4 skit"}'\
     --header "Content-Type: application/json" \
     --header "X-SKITTER-AUTH-USER: ctt1414" \
     --header "X-SKITTER-AUTH-NAME: Joe Bartelmo" \
     --header "Accept: */*" \
    https://skitcreate:81/skits/AddSkit

curl -k -X POST -d '{"msg":"This is the 5 skit"}'\
     --header "Content-Type: application/json" \
     --header "X-SKITTER-AUTH-USER: jfb3657" \
     --header "X-SKITTER-AUTH-NAME: Joe Bartelmo" \
     --header "Accept: */*" \
    https://skitcreate:81/skits/AddSkit

curl -k -X POST -d '{"msg":"Hello world."}'\
     --header "Content-Type: application/json" \
     --header "X-SKITTER-AUTH-USER: tk3775" \
     --header "X-SKITTER-AUTH-NAME: Tyler Kuhns" \
     --header "Accept: */*" \
    https://skitcreate:81/skits/AddSkit
