#! /bin/bash

./scripts/insert_release_date.sh
search="http:\/\/localhost:5000"
replace="http:\/\/dev.server.pet-projets.ru"
filename="./frontend/js/game.js"
sed -i "s/$search/$replace/" $filename

search="database.json"
replace="..\/..\/dev_database.json"
filename="./backend/server.py"
sed -i "s/$search/$replace/" $filename

./scripts/start_backend.sh
sudo systemctl restart dev_server
