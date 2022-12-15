#!/usr/bin/env bash

set -ex

clear

yarn -d

yarn migrate

yarn seed

yarn start:dev
