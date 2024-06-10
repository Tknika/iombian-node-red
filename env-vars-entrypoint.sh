#!/bin/bash

set -e

chown -R node-red:node-red /data

if [ ! -f "/data/settings.js" ]; then
    cp /usr/src/node-red/node_modules/node-red/settings.js /data/settings.js
fi

/usr/local/bin/node /env-vars-entrypoint.js

exec su -l node-red "$@"