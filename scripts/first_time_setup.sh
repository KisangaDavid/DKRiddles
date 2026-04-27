#!/bin/bash

sudo apt install python3-pip
sudo apt install python3.12-venv
sudo apt install redis-server
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ../frontend
sudo npm i --production --verbose