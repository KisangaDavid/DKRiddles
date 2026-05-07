#!/bin/bash

# Install necessary apt packages
sudo apt update
sudo apt-get install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] https://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx
sudo apt-get install nginx
sudo apt-get install certbot python3-certbot-nginx
sudo apt-get install python3-pip
sudo apt-get install python3.12-venv
sudo apt-get install redis-server
sudo apt-get install npm

# Set up node and npm
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo npm install -g npm@latest 

# Generate an SSL certificate using certbot
sudo certbot --nginx -d theriddleman.com -d www.theriddleman.com

# Configure systemd services
sudo cp ../config/*.service /etc/systemd/system/
sudo systemctl daemon-reload

# Configure the backend Django app
cd ../backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py collectstatic --noinput

# Configure the frontend Node app
cd ../frontend
sudo npm i --verbose