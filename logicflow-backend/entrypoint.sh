#!/bin/bash

set -e

python manage.py makemigrations doc --no-input
python manage.py migrate doc --no-input
python manage.py migrate  --no-input
python manage.py collectstatic --no-input 
# python manage.py createsuperuser --username $DJANGO_SUPERUSER_USERNAME  --no-input

ls


# gunicorn mysite.wsgi --bind 0.0.0.0:8000
gunicorn --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000 mysite.asgi:application