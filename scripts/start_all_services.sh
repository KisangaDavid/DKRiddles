#!/bin/bash

sudo systemctl start nginx 
sudo systemctl start frontend
sudo systemctl start redis-server
sudo systemctl start gunicorn