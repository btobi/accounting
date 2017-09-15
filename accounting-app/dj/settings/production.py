from dj.settings.base import *

VERSION = '1.0.2'

print("VERSION {}".format(VERSION))

print("Enabling production profile...")

DEBUG = False

ALLOWED_HOSTS = ['accounting-py', 'localhost']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'finance',
        'USER': 'finance',
        'PASSWORD': 'finance',
        'HOST': 'accounting-db',
        'PORT': 5432,
    }
}