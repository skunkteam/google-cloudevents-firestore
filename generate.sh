#!/bin/bash

set -euo pipefail

# information how to generate working ES6 module found at https://github.com/protobufjs/protobuf.js/issues/1862#issuecomment-1660014799
# requires custom wrapper (with --wrap argument) and custom string to import protobufjs/minimal (with --dependency argument)
echo Generating javascript...
npx pbjs \
    --target static-module \
    --wrap wrapper.js \
    --dependency protobufjs/minimal.js \
    --es6 \
    --out index.js \
    --path googleapis \
    google-cloudevents/proto/google/events/cloud/firestore/v1/data.proto

echo Generating typescript types...
npx pbts \
    --out index.d.ts \
    index.js

echo Running tests...
npm test

echo Done
