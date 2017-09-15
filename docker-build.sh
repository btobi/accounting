#!/usr/bin/env bash

# NGINX
#echo ===========
#echo build nginx
#echo ===========
#docker build . -f Dockerfile-nginx -t accounting-nginx
#docker tag accounting-nginx btobias92/accounting-nginx

# ACCOUNTING
echo
echo ===========
echo build accounting-app
echo ===========
docker build . -f Dockerfile -t accounting
docker tag accounting btobias92/accounting
