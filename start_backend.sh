#!/bin/bash

cd ./backend
source .venv/bin/activate
sudo systemctl start redis-server
exec gunicorn --workers 3 --threads 2 --bind 0.0.0.0:8000 --access-logfile - config.wsgi:application


