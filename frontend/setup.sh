#!/bin/bash

set -e

if [[ ! -d node_modules ]]
then
    echo "node_modules folder not found ! Installing it"
    npm install
fi

npm run serve