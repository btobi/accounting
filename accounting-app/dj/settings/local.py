from dj.settings.base import *

INSTALLED_APPS.append(
    'django.contrib.staticfiles'
)

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, '../../dist'),
)

DEBUG = True

PROFILE = "local"

ALLOWED_HOSTS = ['localhost']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, '../../db.sqlite3'),
    }
}
