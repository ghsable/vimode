#!/bin/bash

readonly OUTPUT_FILE=~/vimode.zip
if [ -f ${OUTPUT_FILE} ]; then
  rm ${OUTPUT_FILE}
fi

cd $(dirname ${0})
7za a -tzip ${OUTPUT_FILE} README.md LICENSE manifest.json icons content-script.js background-script.js
