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
const canvasHoldFigure = document.getElementById('holdFigure');
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
    level.timeOfTurn = timeForLevel(1);
    addGameSpeedEdit();
    rowCount = 0;
    document.getElementById('count_row').innerHTML = rowCount;
    holdFigure = undefined;
    holdColor = undefined;
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

// Проверка, что пользователь не отвлекся от основной страницы
window.addEventListener('focus', function() {
    pause = false;
})

window.addEventListener('blur', function() {
    pause = true;
})

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
let holdFigure;
let holdColor;

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

function drawHold(x, y, color) {
    internalDraw(x, y, color, canvasHoldFigure);
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

function clearHold() {
    if (canvasHoldFigure.getContext) {
        const ctx = canvasHoldFigure.getContext('2d');
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

function drawHoldFigure() {
    clearHold();
    if (holdFigure === undefined) {
        return
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (holdFigure[i][j] === 1) {
                drawHold(i * SQUARE_SIZE, j * SQUARE_SIZE, holdColor);
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

// 130 + 700 / (n + 1) ^ 0.5

function timeForLevel(n) {
    return 130 + 700 / n ** 0.5;
}

// объект уровень, значения в начале игры
const level = { levelNumber: 1, timeOfTurn: timeForLevel(1) };


function plusGameSpeed() {
    level.levelNumber++;
    level.timeOfTurn = timeForLevel(level.levelNumber);
    addGameSpeedEdit();
}

function addGameSpeedEdit() {
    document.querySelector('#outSpeed').innerHTML = level.levelNumber;
    clearInterval(interval);
    interval = setInterval(funcInterval, level.timeOfTurn);
}

// функция работы с карманной фигурой
function functionHoldFigure() {
    if (holdFigure != undefined) {
        const bufferFigure = currentFigure;
        const bufferColor = currentColor;
        currentFigure = holdFigure;
        currentColor = holdColor;
        holdFigure = bufferFigure;
        holdColor = bufferColor;
    } else {
        holdFigure = currentFigure;
        holdColor = currentColor;
        currentFigure = nextFigure;
        currentColor = nextColor;
        figure = getFigure();
        nextFigure = figure.figure;
        nextColor = figure.color;
    }
    y = -SQUARE_SIZE * heightFigure();
    x = SQUARE_SIZE * CENTER_FIELD;
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName != 'F5') {
        event.preventDefault();
    }
    if (isGameOver || pause) return;

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
        rowCount = (rowCount + 0.1).toFixed(1);
        rowCount = parseFloat(rowCount);
        document.getElementById('count_row').innerHTML = rowCount;
        y += SQUARE_SIZE;
    }
    if (keyName === ' ') {
        rowCount += 1;
        document.getElementById('count_row').innerHTML = rowCount;
        dropFigure();
    }

    if (keyName === 'Control') {
        functionHoldFigure()
    }
    drawFullFigure();
    drawLines();
});

function dropFigure() {
    while (!isCollision(0, 1)) {
        y += SQUARE_SIZE;
    }
    saveState();
}

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
let rowCount = 0;

function deleteRow() {
    let x = 0;
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
            x++;
        }
    }
    if (x === 0) {
        return
    }
    rowCount += 2 ** x;
    lineClearSound.play();
    document.getElementById('count_row').innerHTML = rowCount;
    while (rowCount >= level.levelNumber * 5) {
        plusGameSpeed();
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
                    indexX >= MAX_WIDTH / SQUARE_SIZE
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

function saveState() {
    save();
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
}

function funcInterval() {
    if (pause || isGameOver) return;
    drawFullFigure();
    drawNextFigure();
    drawHoldFigure();
    drawLines();
    if (!isCollision(0, 1)) {
        y += SQUARE_SIZE;
    } else {
        saveState();
    }
}

function getRecords() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL + '/records');
    xhr.onload = function() {
        if (xhr.status === 200) {
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
            }
            document.querySelector('#leaderBoard').innerHTML = html.join('');
        }
    }
    xhr.send();
}

function addRecord() {
    const json = JSON.stringify({
        username: localStorage['tetris.username'],
        score: rowCount,
        complexity: numberLevel,
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', BASE_URL + '/records');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            getRecords();
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

// Dark Mode Button
let dark = false;
const body = document.getElementById('main');
const button = document.getElementById('darkTheme')

button.addEventListener('click', () => {
    if (dark) {
        body.className = 'theme-light';
        button.innerHTML = 'Включить тёмную тему';
    } else {
        body.className = 'theme-dark';
        button.innerHTML = 'Включить светлую тему';
    }
    dark = !dark;
})
