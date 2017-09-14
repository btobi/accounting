FROM python:3

WORKDIR .
ADD requirements.txt .
RUN pip install -r requirements.txt

ADD . .

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE 'dj.settings.production'