#!/bin/bash

set -e

node /env-vars-entrypoint.js

exec "$@"