const SQUARE_SIZE = 30;
const MAX_HEIGHT = 600;
const MAX_WIDTH = 300;
const MAX_HEIGHT_NEXT_FIGURE = 120;
const MAX_WIDTH_NEXT_FIGURE = 150;
let isGameOver = false;
const canvas = document.getElementById('canvasid');
const canvasNextFigure = document.getElementById('nextFigure');
const lineClearSound = new Audio('./audio/line.wav');
const gameOverSound = new Audio('./audio/gameover.wav');

// const keyRestart = document.querySelector('#restart')
// keyRestart.addEventListener('click', () => location.reload());

let x = SQUARE_SIZE;
let y = 0;
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
let currentColor;

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

const listFigure = []; // буфер фигур
// первичное заполнение буфера фигурами
if (listFigure.concat.length < 2) {
    switch (getRandom(0, 7)) {
        case 0:
            currentFigure0 = figure1;
            currentColor = 'green';
            break;
        case 1:
            currentFigure0 = figure2;
            currentColor = 'red';
            break;
        case 2:
            currentFigure0 = figure3;
            currentColor = 'yellow';
            break;
        case 3:
            currentFigure0 = figure4;
            currentColor = 'pink';
            break;
        case 4:
            currentFigure0 = figure5;
            currentColor = '#ec12a8';
            break;
        case 5:
            currentFigure0 = figure6;
            currentColor = 'brown';
            break;
        default:
            currentFigure0 = figure7;
            currentColor = 'blue';
    }
    listFigure.push(currentFigure0);
}

let nextFigure;

function figure() {
    let currentFigure0;
    switch (getRandom(0, 7)) {
        case 0:
            currentFigure0 = figure1;
            currentColor = 'green';
            break;
        case 1:
            currentFigure0 = figure2;
            currentColor = 'red';
            break;
        case 2:
            currentFigure0 = figure3;
            currentColor = 'yellow';
            break;
        case 3:
            currentFigure0 = figure4;
            currentColor = 'pink';
            break;
        case 4:
            currentFigure0 = figure5;
            currentColor = '#ec12a8';
            break;
        case 5:
            currentFigure0 = figure6;
            currentColor = 'brown';
            break;
        default:
            currentFigure0 = figure7;
            currentColor = 'blue';
    }
    listFigure.unshift(currentFigure0);
    delete listFigure[2];
    nextFigure = listFigure[0];
    console.log(nextFigure);
    turnNextFigure = 0;
    return listFigure[1];
}

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
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (currentFigure[i][j] === 1) {
                draw(x + i * SQUARE_SIZE, y + j * SQUARE_SIZE, currentColor);
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
function restoreNext() {
    for (let i = 0; i < arrNext.length; i++) {
        for (let j = 0; j < arrNext[0].length; j++) {
            if (arrNext[i][j] !== 0) {
                drawNext(j, i, arrNext[i][j]);
            }
        }
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
    restoreNext();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (nextFigure[i][j] === 1) {
                drawNext(i * SQUARE_SIZE, j * SQUARE_SIZE, currentColor);
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
const level = {levelNumber: 1, timeOfTurn: 1000};

const keySpeedUp = document.querySelector('#plusSpeed');
const keySpeedDown = document.querySelector('#minusSpeed');

// список скоростей
// список времени ожидения хода фигуры
const blockTimeOfTurn = [1000, 650, 500, 300, 160];

function plusGameSpeed() {
    if (level.levelNumber < 5) {
        level.levelNumber = level.levelNumber + 1;
        level.timeOfTurn = blockTimeOfTurn[level.levelNumber - 1];

        document.getElementById('outSpeed').innerHTML = level.levelNumber;
        console.log(level.timeOfTurn);
        console.log(level);

        clearInterval(interval);
        interval = setInterval(funcInterval, level.timeOfTurn);
    }
}

function minusGameSpeed() {
    if (level.levelNumber > 1) {
        level.levelNumber = level.levelNumber - 1;
        level.timeOfTurn = blockTimeOfTurn[level.levelNumber - 1];

        document.getElementById('outSpeed').innerHTML = level.levelNumber;
        console.log(level.timeOfTurn);
        console.log(level);

        clearInterval(interval);
        interval = setInterval(funcInterval, level.timeOfTurn);
    }
}

keySpeedUp.addEventListener('click', plusGameSpeed);
keySpeedDown.addEventListener('click', minusGameSpeed);

document.addEventListener('keydown', (event) => {
    if (isGameOver || pause) return;
    const keyName = event.key;
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

    drawFullFigure();
    drawLines();
});

const arr = new Array();
for (let i = 0; i < MAX_HEIGHT / SQUARE_SIZE; i++) {
    arr[i] = new Array(MAX_WIDTH / SQUARE_SIZE);
    for (let j = 0; j < MAX_WIDTH / SQUARE_SIZE; j++) {
        arr[i][j] = 0;
    }
}

function save() {
    for (let i = 0; i < currentFigure.length; i++) {
        for (let j = 0; j < currentFigure[0].length; j++) {
            if (currentFigure[i][j] === 1 && y >= 0) {
                arr[y / SQUARE_SIZE + j][x / SQUARE_SIZE + i] = currentColor;
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
const countRow = {count: 0, nextLevelCount: 2};

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

        if (countRow.count == 5 && countRow.nextLevelCount == 2) {
            plusGameSpeed();
            countRow.nextLevelCount++;
        }
        if (countRow.count == 10 && countRow.nextLevelCount == 3) {
            plusGameSpeed();
            countRow.nextLevelCount++;
        }
        if (countRow.count == 15 && countRow.nextLevelCount == 4) {
            plusGameSpeed();
            countRow.nextLevelCount++;
        }
        if (countRow.count == 20 && countRow.nextLevelCount == 5) {
            plusGameSpeed();
            countRow.nextLevelCount++;
        }
    }
}

function isCollision(dx, dy) {
    for (let i = 0; i < currentFigure.length; i++) {
        for (let j = 0; j < currentFigure[0].length; j++) {
            if (currentFigure[i][j] === 1 && y >= 0) {
                const calculatedX = x + (i + dx) * SQUARE_SIZE;
                const calculatedY = y + (j + dy + 1) * SQUARE_SIZE;
                if (
                    calculatedY > MAX_HEIGHT ||
                    calculatedX < 0 || calculatedX > MAX_WIDTH
                ) {
                    return true;
                }
                if (arr[y / SQUARE_SIZE + j + dy][x / SQUARE_SIZE + i + dx] !== 0) {
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

let turnNextFigure = 0; // счетчик подачи след. фигуры

function funcInterval() {
    if (pause) return;

    drawFullFigure();
    deleteRow();
    drawLines();

    if (turnNextFigure < 4) {
        drawNextFigure();
        turnNextFigure++;
    }
    // убраны странные условия на max_height
    if (!isCollision(0, 1)) {
        y += SQUARE_SIZE;
    } else {
        save();
        console.log(arr);
        currentFigure = figure();
        if (isStop()) {
            gameOverSound.play();
            alert('!game over!');
            clearInterval(interval);
            isGameOver = true;
        }
        y = -SQUARE_SIZE * (heightFigure() + 1);
        x = SQUARE_SIZE;
        console.log('save');
    }
}
// таймер обновления шага фигуры
let interval = setInterval(funcInterval, level.timeOfTurn);

currentFigure = figure();
y = -SQUARE_SIZE * heightFigure();
drawLines();
