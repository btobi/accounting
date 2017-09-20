# noinspection PyUnresolvedReferences
from dj.settings.base import *

PROFILE = "develop"

DEBUG = True

ALLOWED_HOSTS = ['accounting-py', 'localhost', 'accounting-dev-py']

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