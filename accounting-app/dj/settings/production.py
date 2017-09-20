# noinspection PyUnresolvedReferences
from dj.settings.base import *

DEBUG = False

PROFILE = "production"

ALLOWED_HOSTS = ['accounting-py', 'localhost', 'accounting-prd-py']

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