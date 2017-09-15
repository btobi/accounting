#!/usr/bin/env bash

# NGINX
echo build nginx
docker build . -f Dockerfile-nginx -t accounting-nginx
docker tag accounting-nginx btobias92/accounting-nginx

# ACCOUNTING
echo build accounting-app
docker build . -f Dockerfile-accounting -t accounting
docker tag accounting btobias92/accounting
