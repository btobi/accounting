# Accounting App

Manage your bank accounts. Tidy up your accounting records. Gain insights in your spending and income.

### Basic Development Setup

Guide with respect to development in Pycharm (Jetbrains).

1. Checkout repository
2. Install and create virtualenv (http://docs.python-guide.org/en/latest/dev/virtualenvs/)
    - Link virtual environment in Pycharm
    - Install requirements located in accounting-app
3. Setup Django configuration in Pycharm
    - accounting-app is Django-root
    - dj.settings.local is settings file for local development
    - dj.settings.develop: QA-Environment
    - dj.settings.production: Production-Environment
4. Add Run-Configuration
    - Everything should be handled automatically.
    - Check that in "Environment variables" *DJANGO_SETTINGS_MODULE* links to *dj.settings.local*
5. Install npm dependencies
    - package.json is located in accounting-app
6. Run ``npm run dev`` in accounting-app
7. Run Python Project

### Initial Setup

1. Make sure you have virtualenv open in console
    - ``source virtual-env/bin/activate`` (add .fish if necessary)
2. In accounting-app run
    - ``python manage.py makemigrations``
    - ``python manage.py migrate`` (delete old database if present)
    - ``python manage.py createsuperuser`` and provide username and pw
3. Go to localhost:8000 and login with created user
4. Navigate to localhost:8000/admin, and create new user if desired

### Dependencies

This project depends on https://github.com/btobi/react-redux-forms. Check link in *package.json*.

### Settings Table

| Setting ID        | Values           | Description  |
| :--- |:---| :--- |
|showOpenings | True, False | Show opening accounts |
