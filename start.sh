#!/bin/sh


# Start Gunicorn processes
echo Starting Gunicorn.
gunicorn dj.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 1