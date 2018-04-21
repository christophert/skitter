#!/bin/bash
while ! curl -s -k https://skitcreate:81/skits/ > /dev/null; \
    do \
        echo "waiting for all services..."
        sleep 3; \
    done;
mysql -h db -u skitter_overlord -pa_GENerIC_p@ssW0rd skitter < "./users.sql"
./skits.sh

echo "This Container is going to close now, this is not an error"
