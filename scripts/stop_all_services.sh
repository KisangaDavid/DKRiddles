#!/bin/bash

sudo systemctl stop redis-server
sudo systemctl stop gunicorn
sudo systemctl stop frontend
sudo systemctl stop nginx