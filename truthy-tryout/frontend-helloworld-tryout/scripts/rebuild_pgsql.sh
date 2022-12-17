#!/usr/bin/env bash

set -ex


docker compose kill postgres

docker compose stop postgres

sudo rm -rf ./volumes/postgres/data

docker compose up -d
