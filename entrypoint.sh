#!/usr/bin/env bash


WORKING_DIR='staticmount'

if [ -d "$WORKING_DIR" ]; then
    rm -Rf ${WORKING_DIR}/*
fi

cp -a /static/. /${WORKING_DIR}/

rm -r /static


WORKING_DIR='nginxmount'

if [ -d "$WORKING_DIR" ]; then
    rm -Rf ${WORKING_DIR}/*
fi

cp -a /nginx/. /${WORKING_DIR}/

python manage.py makemigrations
python manage.py migrate

cat <<EOF | python manage.py shell
from django.contrib.auth.models import User
User.objects.filter(username="admin").exists() or \
    User.objects.create_superuser("admin", "admin@example.com", "admin123")
EOF

gunicorn dj.wsgi -b 0.0.0.0:8000