from dj.settings.base import *

print("Enabling production profile...")

DEBUG = False

ALLOWED_HOSTS = ['accounting-py', 'localhost']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'accounting-db',
        'PORT': 5432,
    }
}