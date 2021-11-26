#!/bin/bash

# Create Add-on
readonly OUTPUT_FILE=~/vimode.zip
[ ! -f ${OUTPUT_FILE} ] || rm -v ${OUTPUT_FILE}

cd $(dirname ${0})
7za a -tzip ${OUTPUT_FILE} README.md LICENSE manifest.json icons content-script.js background-script.js

# Run mozilla/addons-linter - https://github.com/mozilla/addons-linter
readonly ADDONS_LINTER=~/javascript/node_modules/addons-linter/bin/addons-linter
[ ! -f ${ADDONS_LINTER} ] || ${ADDONS_LINTER} ${OUTPUT_FILE}
