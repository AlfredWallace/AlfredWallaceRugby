#!/usr/bin/env bash

npm run build

ssh wallace@vps606622.ovh.net "mkdir -p /home/wallace/awr"
ssh wallace@vps606622.ovh.net "rm -rf /home/wallace/awr/*"
scp -r ./dist/* wallace@vps606622.ovh.net:/home/wallace/awr/

ssh -t wallace@vps606622.ovh.net "sudo mkdir -p /var/www/awr/html && sudo rm -rf /var/www/awr/html/* && sudo cp -r /home/wallace/awr/* /var/www/awr/html"
