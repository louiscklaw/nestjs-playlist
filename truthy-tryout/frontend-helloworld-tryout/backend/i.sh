#!/usr/bin/env bash

apt install -qyy entr

find . |entr -c -s "./entry.sh"
