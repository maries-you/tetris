const SQUARE_SIZE = 30;
const MAX_HEIGHT = 600;
const MAX_WIDTH = 300;
const MAX_HEIGHT_NEXT_FIGURE = 120;
const MAX_WIDTH_NEXT_FIGURE = 150;
let isGameOver = false;
const canvas = document.getElementById('canvasid');
const canvasNextFigure = document.getElementById('nextFigure');

const keyRestart = document.querySelector("#restart")
keyRestart.addEventListener('click', () => location.reload());

let x = SQUARE_SIZE;
let y = 0;
// рисует сетку на поле
function draw_lines() {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#dfe2e8'

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
let current_color;

const figure1 = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
]
const figure2 = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
]
const figure3 = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
]
const figure4 = [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
]
const figure5 = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
]
const figure6 = [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
]
const figure7 = [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
]

const listFigure = []; // буфер фигур
// первичное заполнение буфера фигурами
if (listFigure.concat.length < 2) {
    switch (getRandom(0, 7)) {
        case 0:
            current_figure0 = figure1;
            current_color = 'green';
            break;
        case 1:
            current_figure0 = figure2;
            current_color = 'red';
            break;
        case 2:
            current_figure0 = figure3;
            current_color = 'yellow';
            break;
        case 3:
            current_figure0 = figure4;
            current_color = 'pink';
            break;
        case 4:
            current_figure0 = figure5;
            current_color = '#ec12a8';
            break;
        case 5:
            current_figure0 = figure6;
            current_color = 'brown'
            break;
        default:
            current_figure0 = figure7;
            current_color = 'blue';
    }
    listFigure.push(current_figure0)
}

let next_figure;

function figure() {
    let current_figure
    let current_figure0;
    switch (getRandom(0, 7)) {
        case 0:
            current_figure0 = figure1;
            current_color = 'green';
            break;
        case 1:
            current_figure0 = figure2;
            current_color = 'red';
            break;
        case 2:
            current_figure0 = figure3;
            current_color = 'yellow';
            break;
        case 3:
            current_figure0 = figure4;
            current_color = 'pink';
            break;
        case 4:
            current_figure0 = figure5;
            current_color = '#ec12a8';
            break;
        case 5:
            current_figure0 = figure6;
            current_color = 'brown'
            break;
        default:
            current_figure0 = figure7;
            current_color = 'blue';
    }
    listFigure.unshift(current_figure0)
    delete listFigure[2]
    next_figure = listFigure[0]
    console.log(next_figure)
    current_figure = listFigure[1]
    turnNextFigure = 0
    return current_figure
}


function draw(x, y, color) {
    if (pause == false) {
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = "#555555";
            ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
            ctx.fillStyle = color;
            ctx.fillRect(x + 2, y + 2, SQUARE_SIZE - 6, SQUARE_SIZE - 6);
        }
    }
}

function clear() {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    }
}

function draw_full_figure() {
    if (pause == false) {
        clear();
        restore();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (current_figure[i][j] === 1) {
                    draw(x + i * SQUARE_SIZE, y + j * SQUARE_SIZE, current_color)
                }
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
                drawNext(j, i, arrNext[i][j])
            }
        }
    }
}
function drawNext(x, y, color) {
    if (canvasNextFigure.getContext) {
        const ctx = canvasNextFigure.getContext('2d');
        ctx.fillStyle = "#454545";
        ctx.fillRect(x, y, SQUARE_SIZE + 2, SQUARE_SIZE); // рисует квадрат заливки
        ctx.fillStyle = color;
        ctx.fillRect(x + 1, y + 1, SQUARE_SIZE - 6, SQUARE_SIZE - 6);
    }
}

function clearNext() {
    if (canvasNextFigure.getContext) {
        const ctx = canvasNextFigure.getContext('2d');
        ctx.clearRect(0, 0, MAX_WIDTH_NEXT_FIGURE, MAX_HEIGHT_NEXT_FIGURE);
    }
}

function drawNextFigure() {
    clearNext()
    restoreNext();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (next_figure[i][j] === 1) {
                drawNext(x + i * SQUARE_SIZE, y + j * SQUARE_SIZE, current_color)
            }
        }
    }
}

function height_figure() {
    let myArray = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (current_figure[i][j] === 1) {
                myArray.push(j);
            }
        }
    }
    return Math.max.apply(null, myArray);
}
// кнопка паузы
const keyPause = document.querySelector("#pause");
let pause = false;
// меняем переменную паузы.
function editPause() {
    pause = !pause;
    return pause;
}
// вызываем изменение переменной паузы кликом по кнопке 
keyPause.addEventListener("click", editPause);
// объект уровень, значения в начале игры
const level = {levelNumber: 1, timeOfTurn: 1000};

const outSpeedInfo = document.querySelector("#outSpeed");
const keySpeedUp = document.querySelector("#plusSpeed");
const keySpeedDown = document.querySelector("#minusSpeed");

// список скоростей
// список времени ожидения хода фигуры
const blockTimeOfTurn = [1000, 650, 500, 300, 160];

function plusGameSpeed() {
    if (level.levelNumber < 5) {
        level.levelNumber = level.levelNumber + 1
        level.timeOfTurn = blockTimeOfTurn[level.levelNumber - 1]

        document.getElementById("outSpeed").innerHTML = level.levelNumber
        console.log(level.timeOfTurn)
        console.log(level)

        clearInterval(interval)
        interval = setInterval(funcInterval, level.timeOfTurn)
    }
}

function minusGameSpeed() {
    if (level.levelNumber > 1) {
        level.levelNumber = level.levelNumber - 1
        level.timeOfTurn = blockTimeOfTurn[level.levelNumber - 1]

        document.getElementById("outSpeed").innerHTML = level.levelNumber
        console.log(level.timeOfTurn)
        console.log(level)

        clearInterval(interval)
        interval = setInterval(funcInterval, level.timeOfTurn)
    }
}

keySpeedUp.addEventListener("click", plusGameSpeed)
keySpeedDown.addEventListener("click", minusGameSpeed)

document.addEventListener('keydown', (event) => {
    if (isGameOver || pause) return;
    const keyName = event.key;
    console.log('Событие keydown:' + keyName);

    if (keyName === 'ArrowLeft' && !is_collision(-1, 0)) {
        x -= SQUARE_SIZE;
    }
    if (keyName === 'ArrowRight' && !is_collision(1, 0)) {
        x += SQUARE_SIZE;
    }
    if (keyName === 'ArrowUp') {
        let temp_figure = current_figure
        current_figure = turn(current_figure);
        if (is_collision(0, 0)) {
            current_figure = temp_figure;
        }

    }
    if (keyName === 'ArrowDown' && !is_collision(0, 1)) {
        y += SQUARE_SIZE;
    }

    draw_full_figure();
    draw_lines();
});

document.addEventListener('key', (event) => {
    if (isGameOver || pause) return;
    const keyName = event.key;
    console.log('Событие keydown: ' + keyName);

    if (keyName === 'ArrowLeft' && !is_collision(-1, 0)) {
        x -= SQUARE_SIZE;
    }

    if (keyName === 'ArrowRight' && !is_collision(1, 0)) {
        x += SQUARE_SIZE;
    }
    if (keyName === 'ArrowUp') {
        let temp_figure = current_figure;
        current_figure = turn(current_figure);
        if (is_collision(0, 0)) {
            current_figure = temp_figure;
        }
    }
    if (keyName === 'ArrowDown' && !is_collision(0, 1)) {
        y += SQUARE_SIZE;
    }

    draw_full_figure();
    draw_lines();
});

const arr = new Array();
for (let i = 0; i < MAX_HEIGHT / SQUARE_SIZE; i++) {
    arr[i] = new Array(MAX_WIDTH / SQUARE_SIZE);
    for (let j = 0; j < MAX_WIDTH / SQUARE_SIZE; j++) {
        arr[i][j] = 0;
    }
}

function save() {
    for (let i = 0; i < current_figure.length; i++) {
        for (let j = 0; j < current_figure[0].length; j++) {
            if (current_figure[i][j] === 1 && y >= 0) {
                arr[y / SQUARE_SIZE + j][x / SQUARE_SIZE + i] = current_color;
            }
        }
    }
}

function is_stop() {
    for (let i = 0; i < arr[0].length; i++) {
        if (arr[0][i] !== 0) {
            return true
        }
    }
    return false
}

function restore() {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] !== 0) {
                draw(j * SQUARE_SIZE, i * SQUARE_SIZE, arr[i][j])
            }
        }
    }
}

// счетчик очков (линий)/ переменная, для блокировки авторазнога уровня сразу до максиума
const countRow = {count: 0, nextLevelCount: 2}

function delete_row() {
    for (let i = 0; i < arr.length; i++) {
        let count = 0;
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 0) {
                count++;
            }
        }
        if (count === 0) {
            const empty_row = new Array(arr[0].length).fill(0);
            arr.splice(i, 1);
            arr.unshift(empty_row);
            countRow.count++;

            document.getElementById("count_row").innerHTML = countRow.count;
            console.log(countRow.count);
            return countRow.count
        }

        if (countRow.count == 5 && countRow.nextLevelCount == 2) {
            plusGameSpeed()
            countRow.nextLevelCount++
        }
        if (countRow.count == 10 && countRow.nextLevelCount == 3) {
            plusGameSpeed()
            countRow.nextLevelCount++
        }
        if (countRow.count == 15 && countRow.nextLevelCount == 4) {
            plusGameSpeed()
            countRow.nextLevelCount++
        }
        if (countRow.count == 20 && countRow.nextLevelCount == 5) {
            plusGameSpeed()
            countRow.nextLevelCount++
        }
    }
}

function is_collision(dx, dy) {
    for (let i = 0; i < current_figure.length; i++) {
        for (let j = 0; j < current_figure[0].length; j++) {
            if (current_figure[i][j] === 1 && y >= 0) {
                const calculatedX = x + (i + dx) * SQUARE_SIZE;
                const calculatedY = y + (j + dy + 1) * SQUARE_SIZE;
                if (
                    calculatedY > MAX_HEIGHT ||
                    calculatedX < 0 || calculatedX > MAX_WIDTH
                ) {
                    return true;
                }
                if (arr[y / SQUARE_SIZE + j + dy][x / SQUARE_SIZE + i + dx] !== 0) {
                    return true
                }
            }
        }
    }
    return false
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

let turnNextFigure = 0 // счетчик подачи след. фигуры

function funcInterval() {
    if (pause) return;

    draw_full_figure();
    delete_row();
    draw_lines();

    if (turnNextFigure < 4) {
        drawNextFigure()
        turnNextFigure++
    }
    // убраны странные условия на max_height
    if (!is_collision(0, 1)) {
        y += SQUARE_SIZE;
    } else {
        save();
        console.log(arr);
        current_figure = figure();
        next_figure
        if (is_stop()) {
            alert('!game over!')
            clearInterval(interval)
            isGameOver = true
        }
        y = -SQUARE_SIZE * (height_figure() + 1);
        x = SQUARE_SIZE;
        console.log('save');
    }
}
// таймер обновления шага фигуры
let interval = setInterval(funcInterval, level.timeOfTurn)

current_figure = figure()
y = -SQUARE_SIZE * height_figure()
draw_lines()
