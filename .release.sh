#!/bin/bash

# Create Add-on
readonly OUTPUT_FILE=~/vimode.zip
[ ! -f ${OUTPUT_FILE} ] || rm -v ${OUTPUT_FILE}

cd $(dirname ${0})
7za a -tzip ${OUTPUT_FILE} README.md LICENSE manifest.json icons content-script.js background-script.js

# Run mozilla/addons-linter - https://github.com/mozilla/addons-linter
readonly ADDONS_LINTER=~/javascript/node_modules/addons-linter/bin/addons-linter
if [ -f ${OUTPUT_FILE} ] && [ -f ${ADDONS_LINTER} ]; then ${ADDONS_LINTER} ${OUTPUT_FILE}; fi
