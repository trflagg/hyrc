#!/bin/bash

# Download linux version of node-sass binary
# Should update version number if node version changes
mkdir node_modules/node-sass/vendor/linux-x64-59
curl -L https://github.com/sass/node-sass/releases/download/v4.9.3/linux-x64-59_binding.node > node_modules/node-sass/vendor/linux-x64-59/binding.node


