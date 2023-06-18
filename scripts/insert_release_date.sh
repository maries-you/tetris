#! /bin/bash

date=$(git log --pretty=format:"%ad" --date=format:"%d.%m.%Y %H:%M" -n 1)
search="{{ release_date }}"
filename="./frontend/game.html"

sed -i "s/$search/$date/" $filename
