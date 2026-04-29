#!/bin/bash

cd ../backend
source .venv/bin/activate
sudo systemctl start redis-server
sudo systemctl start gunicorn
