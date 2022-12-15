FROM node:14-buster

RUN apt update && \
  apt-get install -qqy musl-dev && \
  ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

# RUN mkdir -p /usr/src/app/node_modules
# RUN chown 1000:1000 -R /usr/src/app
# USER 1000

WORKDIR /usr/src/app
