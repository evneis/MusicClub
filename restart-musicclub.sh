#!/bin/bash

if pm2 list | grep -q "musicclub"; then
    /home/satanicpickle23/.nvm/versions/node/v22.16.0/bin/pm2 restart musicclub
else
    /home/satanicpickle23/.nvm/versions/node/v22.16.0/bin/pm2 start index.js --name "musicclub"
fi
echo "MusicClub $(if pm2 list | grep -q "musicclub"; then echo "restarted"; else echo "started"; fi) at $(date)" >> "$(dirname "$0")/pm2-restart.log" 