#! /bin/bash

./scripts/insert_release_date.sh
search="http:\/\/localhost:5000"
replace="https:\/\/server.pet-projets.ru"
filename="./frontend/js/game.js"
sed -i "s/$search/$replace/" $filename

search="database.json"
replace="..\/..\/database.json"
filename="./backend/server.py"
sed -i "s/$search/$replace/" $filename

./scripts/start_backend.sh
