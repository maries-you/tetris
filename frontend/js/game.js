const SQUARE_SIZE = 30;
const MAX_HEIGHT = 600;
const MAX_WIDTH = 300;
const MAX_HEIGHT_NEXT_FIGURE = 120;
const MAX_WIDTH_NEXT_FIGURE = 120;
const BASE_URL = 'http://localhost:5000';
const CENTER_FIELD = Math.floor((MAX_WIDTH / SQUARE_SIZE) / 2) - 2; // последняя 2ка - это средняя ширина фигуры (элементов)
let isGameOver = false;
const canvas = document.getElementById('canvasid');
const canvasNextFigure = document.getElementById('nextFigure');
const lineClearSound = new Audio('./audio/line.wav');
const gameOverSound = new Audio('./audio/gameover.wav');
const levelPlusKey = document.querySelector('#plusLevel');
const levelMinusKey = document.querySelector('#minusLevel');

const keyRestart = document.querySelector('#restart')
keyRestart.addEventListener('click', restartGame);

let x = SQUARE_SIZE * CENTER_FIELD;
let y = 0;

document.getElementById('name').innerHTML = localStorage['tetris.username'];

// рисует сетку на поле
function drawLines() {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#dfe2e8';

    for (let i = 0; i < MAX_WIDTH / SQUARE_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(SQUARE_SIZE * i, 0);
        ctx.lineTo(SQUARE_SIZE * i, MAX_HEIGHT);
        ctx.stroke();
    }
    for (let j = 0; j < MAX_HEIGHT / SQUARE_SIZE; j++) {
        ctx.beginPath();
        ctx.moveTo(0, SQUARE_SIZE * j);
        ctx.lineTo(MAX_WIDTH, SQUARE_SIZE * j);
        ctx.stroke();
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const figure1 = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
];
const figure2 = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
];
const figure3 = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
];
const figure4 = [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
];
const figure5 = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
];
const figure6 = [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
];
const figure7 = [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
];
const figures = [figure1, figure2, figure3, figure4, figure5, figure6, figure7];
const colors = ['green', 'red', 'yellow', 'pink', '#ec12a8', 'brown', 'blue'];

let numberLevel = 1;

const arr = new Array();
function updateExsistingBlocks() {
    for (let i = 0; i < MAX_HEIGHT / SQUARE_SIZE; i++) {
        arr[i] = new Array(MAX_WIDTH / SQUARE_SIZE);
        for (let j = 0; j < MAX_WIDTH / SQUARE_SIZE; j++) {
            if (i > MAX_HEIGHT / SQUARE_SIZE - numberLevel) {
                arr[i][j] = getRandom(0, 2);
            } else {
                arr[i][j] = 0;
            };
        };
    };
}
updateExsistingBlocks();

function restartGame() {
    y = -SQUARE_SIZE * heightFigure();
    x = SQUARE_SIZE * CENTER_FIELD;
    updateExsistingBlocks();
    drawFullFigure();
    drawNextFigure();
    drawLines();
    pause = false;
    isGameOver = false;
    level.levelNumber = 1;
    level.timeOfTurn = blockTimeOfTurn[0];
    addGameSpeedEdit();
    countRow.count = 0;
    document.getElementById('count_row').innerHTML = countRow.count;
}

function drawGameOver() {
    const field = canvas.getContext('2d');
    const image = new Image();
    image.onload = function() {
        field.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
        field.drawImage(image, 0, MAX_HEIGHT / 4, MAX_WIDTH, MAX_WIDTH);
    }
    image.src = 'img/game_over.jpg';
}

function addGameLevelVisual() {
    updateExsistingBlocks();
    document.querySelector('#levelGame').innerHTML = numberLevel;
}

function plusGameLevel() {
    if (numberLevel < MAX_HEIGHT / SQUARE_SIZE) {
        numberLevel++;
        addGameLevelVisual();
    }
}

function minusGameLevel() {
    if (numberLevel > 1) {
        numberLevel--;
        addGameLevelVisual();
    }
}

levelPlusKey.addEventListener('click', plusGameLevel);
levelMinusKey.addEventListener('click', minusGameLevel);

function getFigure() {
    const index = getRandom(0, figures.length);
    const color = colors[index];
    const figure = figures[index];
    return { color: color, figure: figure }
}

let figure = getFigure();
let currentFigure = figure.figure;
let currentColor = figure.color;
figure = getFigure();
let nextFigure = figure.figure;
let nextColor = figure.color;

function internalDraw(x, y, color, canvas) {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#555555';
        ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
        ctx.fillStyle = color;
        const borderSize = 2;
        ctx.fillRect(
            x + borderSize, y + borderSize,
            SQUARE_SIZE - 2 * borderSize, SQUARE_SIZE - 2 * borderSize,
        );
    }
}

function draw(x, y, color) {
    internalDraw(x, y, color, canvas);
}

function drawNext(x, y, color) {
    internalDraw(x, y, color, canvasNextFigure);
}

function clear() {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    }
}

function drawFullFigure() {
    clear();
    restore();
    drawProjection();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (currentFigure[i][j] === 1) {
                draw(x + i * SQUARE_SIZE, y + j * SQUARE_SIZE, currentColor);
            }
        }
    }
}

function drawProjection() {
    let k = 0;
    while (!isCollision(0, k)) {
        k++;
    }
    k--;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (currentFigure[i][j] === 1) {
                draw(x + i * SQUARE_SIZE, y + (j + k) * SQUARE_SIZE, '#e6e8e6');
            }
        }
    }
}
// функции следующей фигуры
const arrNext = new Array(); // array plus pole
for (let i = 0; i < 4; i++) {
    arrNext[i] = new Array(4);
    for (let j = 0; j < 4; j++) {
        arrNext[i][j] = 0;
    }
}

function clearNext() {
    if (canvasNextFigure.getContext) {
        const ctx = canvasNextFigure.getContext('2d');
        ctx.clearRect(0, 0, MAX_WIDTH_NEXT_FIGURE, MAX_HEIGHT_NEXT_FIGURE);
    }
}

function drawNextFigure() {
    clearNext();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (nextFigure[i][j] === 1) {
                drawNext(i * SQUARE_SIZE, j * SQUARE_SIZE, nextColor);
            }
        }
    }
}

function heightFigure() {
    const myArray = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (currentFigure[i][j] === 1) {
                myArray.push(j);
            }
        }
    }
    return Math.max.apply(null, myArray);
}
// кнопка паузы
const keyPause = document.querySelector('#pause');
let pause = false;
// меняем переменную паузы.
function editPause() {
    pause = !pause;
    return pause;
}
// вызываем изменение переменной паузы кликом по кнопке
keyPause.addEventListener('click', editPause);
// объект уровень, значения в начале игры
const level = { levelNumber: 1, timeOfTurn: 1000 };

const keySpeedUp = document.querySelector('#plusSpeed');
const keySpeedDown = document.querySelector('#minusSpeed');

// список времени ожидения хода фигуры
const blockTimeOfTurn = [900, 750, 600, 520, 300];

function plusGameSpeed() {
    if (level.levelNumber < 5) {
        level.levelNumber = level.levelNumber + 1;
        level.timeOfTurn = blockTimeOfTurn[level.levelNumber - 1];
        addGameSpeedEdit();
    }
}

function minusGameSpeed() {
    if (level.levelNumber > 1) {
        level.levelNumber = level.levelNumber - 1;
        level.timeOfTurn = blockTimeOfTurn[level.levelNumber - 1];
        addGameSpeedEdit();
    }
}

function addGameSpeedEdit() {
    document.querySelector('#outSpeed').innerHTML = level.levelNumber;
    clearInterval(interval);
    interval = setInterval(funcInterval, level.timeOfTurn);
}

keySpeedUp.addEventListener('click', plusGameSpeed);
keySpeedDown.addEventListener('click', minusGameSpeed);

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName != 'F5') {
        event.preventDefault();
    }
    if (isGameOver || pause) return;

    console.log('Событие keydown:' + keyName);

    if (keyName === 'ArrowLeft' && !isCollision(-1, 0)) {
        x -= SQUARE_SIZE;
    }
    if (keyName === 'ArrowRight' && !isCollision(1, 0)) {
        x += SQUARE_SIZE;
    }
    if (keyName === 'ArrowUp') {
        const tempFigure = currentFigure;
        currentFigure = turn(currentFigure);
        if (isCollision(0, 0)) {
            currentFigure = tempFigure;
        }
    }
    if (keyName === 'ArrowDown' && !isCollision(0, 1)) {
        y += SQUARE_SIZE;
    }
    if (keyName === ' ') {
        while (!isCollision(0, 1)) {
            y += SQUARE_SIZE;
        }
    }
    drawFullFigure();
    drawLines();
});

function save() {
    for (let i = 0; i < currentFigure.length; i++) {
        for (let j = 0; j < currentFigure[0].length; j++) {
            const indexX = x / SQUARE_SIZE + i;
            const indexY = y / SQUARE_SIZE + j;
            if (currentFigure[i][j] === 1 && indexY >= 0) {
                arr[indexY][indexX] = currentColor;
            }
        }
    }
}

function isStop() {
    for (let i = 0; i < arr[0].length; i++) {
        if (arr[0][i] !== 0) {
            return true;
        }
    }
    return false;
}

function restore() {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] !== 0) {
                draw(j * SQUARE_SIZE, i * SQUARE_SIZE, arr[i][j]);
            }
        }
    }
}

// счетчик очков (линий)/ переменная, для блокировки авторазнога уровня сразу до максиума
const countRow = { count: 0, nextLevelCount: 2 };

function deleteRow() {
    for (let i = 0; i < arr.length; i++) {
        let count = 0;
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 0) {
                count++;
            }
        }
        if (count === 0) {
            const emptyRow = new Array(arr[0].length).fill(0);
            arr.splice(i, 1);
            arr.unshift(emptyRow);
            countRow.count++;
            lineClearSound.play();
            document.getElementById('count_row').innerHTML = countRow.count;
            console.log(countRow.count);
            return countRow.count;
        }

        if (
            countRow.count == 5 && countRow.nextLevelCount == 2 ||
            countRow.count == 10 && countRow.nextLevelCount == 3 ||
            countRow.count == 15 && countRow.nextLevelCount == 4 ||
            countRow.count == 20 && countRow.nextLevelCount == 5
        ) {
            plusGameSpeed();
            countRow.nextLevelCount++;
        }
    }
}

function isCollision(dx, dy) {
    for (let i = 0; i < currentFigure.length; i++) {
        for (let j = 0; j < currentFigure[0].length; j++) {
            if (currentFigure[i][j] === 1) {
                const indexX = x / SQUARE_SIZE + i + dx;
                const indexY = y / SQUARE_SIZE + j + dy;

                if (
                    indexY >= MAX_HEIGHT / SQUARE_SIZE ||
                    indexX < 0 ||
                    indexX > MAX_WIDTH / SQUARE_SIZE
                ) {
                    return true;
                }
                if (indexY >= 0 && arr[indexY][indexX] !== 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

function turn(matrix) {
    const result = [];
    for (let i = matrix.length - 1; i >= 0; i--) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (!result[j]) {
                result[j] = [];
            }
            result[j].push(matrix[i][j]);
        }
    }
    return result;
}

function funcInterval() {
    if (pause || isGameOver) return;
    drawFullFigure();
    drawNextFigure();
    drawLines();
    // убраны странные условия на max_height
    if (!isCollision(0, 1)) {
        y += SQUARE_SIZE;
    } else {
        save();
        // console.log(arr);
        currentFigure = nextFigure;
        currentColor = nextColor;
        figure = getFigure();
        nextFigure = figure.figure;
        nextColor = figure.color;
        if (isStop()) {
            isGameOver = true;
            addRecord();
            clearInterval(interval);
            gameOverSound.play();
            drawGameOver();
        }
        y = -SQUARE_SIZE * heightFigure();
        x = SQUARE_SIZE * CENTER_FIELD;
        console.log('save');
    }
}

function getRecords() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL + '/records');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            const response = JSON.parse(xhr.response);
            const html = [];
            html.push('<tr>');
            html.push('<th>Имя Игрока</th>');
            html.push('<th>Счет</th>');
            html.push('<th>Сложность игры</th>');
            html.push('</tr>');
            for (let i = 0, length = response.length; i < length; i++) {
                html.push('<tr>');
                html.push(`<td>${response[i].username}</td>`);
                html.push(`<td>${response[i].score}</td>`);
                html.push(`<td>${response[i].complexity}</td>`);
                html.push('</tr>');
                console.log(response[i])
            }
            document.querySelector('#leaderBoard').innerHTML = html.join('');
        }
    }
    xhr.send();
}

function addRecord() {
    const json = JSON.stringify({
        username: localStorage['tetris.username'],
        score: countRow.count,
        complexity: numberLevel,
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', BASE_URL + '/records');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.send(json);
}

getRecords();


// таймер обновления шага фигуры
let interval = setInterval(funcInterval, level.timeOfTurn);
// функция удаления сложенной линии рабоатет отдельно от основного генератора хода
setInterval(deleteRow, 250);
drawLines();
y = -SQUARE_SIZE * heightFigure();
