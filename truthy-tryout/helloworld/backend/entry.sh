#!/usr/bin/env bash

set -ex

yarn -d

yarn migrate

yarn seed

yarn start:dev
