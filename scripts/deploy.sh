#! /bin/bash

cd tetris/
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

./insert_release_date.sh
search="http:\/\/localhost:5000"
replace="https:\/\/server.pet-projets.ru"
filename="../frontend/game.js"
sed -i "s/$search/$replace/" $filename

search="database.json"
replace="..\/database.json"
filename="../backend/server.py"
sed -i "s/$search/$replace/" $filename

sudo systemctl restart server