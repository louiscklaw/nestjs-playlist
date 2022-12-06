#!/usr/bin/env bash

apt update
apt-get install -qqy musl-dev

ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

set -ex

yarn -d

yarn start:dev
