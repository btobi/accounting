FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /code

WORKDIR /code

ADD requirements.txt /code/

RUN pip install -r requirements.txt

ADD app /code/
ADD dj /code/
ADD templates /code/
ADD dist /code/
ADD db.sqlite3 /code/
ADD webpack-stats.json /code/
ADD manage.py /code/