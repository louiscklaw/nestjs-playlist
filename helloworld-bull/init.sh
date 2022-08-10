#!/usr/bin/env bash

set -ex


npm i -d
npm i --save @bull-board/ui
npm i --save @bull-board/api
npm i --save @bull-board/express
npm i --save express-basic-auth

npm run start:dev
