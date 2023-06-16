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

cd backend
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

sudo systemctl restart server
