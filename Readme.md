# Accounting App

Manage your bank accounts. Tidy up your accounting records. Gain insights in your spending and income.

### Basic development setup

Guide with respect to development in Pycharm (Jetbrains).

1. Checkout repository
2. Create virtual environment (http://docs.python-guide.org/en/latest/dev/virtualenvs/)
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