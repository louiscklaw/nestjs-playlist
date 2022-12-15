#!/usr/bin/env bash

set -ex


docker container prune -f
docker system prune -f
docker image prune -f
docker volume prune -f
docker network prune -f

sudo rm -rf volumes/redis/data/dump.rdb
sudo rm -rf volumes/postgres/data

sleep 0.5

./reset.sh

sleep 0.5

yarn docker_rebuild

yarn into_backend
