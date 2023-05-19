const SQ_SIZE = 30;
const MAX_HEIGHT = 600;
const MAX_WIDTH = 300;
let is_game_over = false;
const canvas = document.getElementById('canvasid');

let x = SQ_SIZE;
let y = 0;

function draw_lines() {
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = '#dfe2e8'

    for (let i = 0; i < MAX_WIDTH/SQ_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(SQ_SIZE * i, 0);
        ctx.lineTo(SQ_SIZE * i, MAX_HEIGHT);
        ctx.stroke();
    }
    for (let j = 0; j < MAX_HEIGHT/SQ_SIZE; j++) {
        ctx.beginPath();
        ctx.moveTo(0, SQ_SIZE * j);
        ctx.lineTo(MAX_WIDTH, SQ_SIZE * j);
        ctx.stroke();
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
console.log(getRandom(0, 7))
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
function figure() {
    let current_figure;
    switch (getRandom(0, 7)) {
        case 0:
            current_figure = figure1;
            current_color = 'green';
            break;
        case 1:
            current_figure = figure2;
            current_color = 'red';
            break;
        case 2:
            current_figure = figure3;
            current_color = 'yellow';
            break;
        case 3:
            current_figure = figure4;
            current_color = 'pink';
            break;
        case 4:
            current_figure = figure5;
            current_color = '#ec12a8';
            break;
        case 5:
            current_figure = figure6;
            current_color = 'brown'
            break;
        default:
            current_figure = figure7;
            current_color = 'blue';
    }
    return current_figure;
}

function draw(x, y, color) {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, SQ_SIZE, SQ_SIZE);
        ctx.fillStyle = color;
        ctx.fillRect(x + 2, y + 2, SQ_SIZE - 4, SQ_SIZE - 4);
    }
}

function clear() {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    }
}


function draw_full_figure() {
    clear();
    restore();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (current_figure[i][j] === 1) {
                draw(x + i * SQ_SIZE, y + j * SQ_SIZE, current_color)
            }
        }
    }
}

function height_figure() {
    const myArray = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (current_figure[i][j] === 1) {
                myArray.push(j);
            }
        }
    }
    return Math.max.apply(null, myArray);
}


document.addEventListener('keydown', (event) => {
    if (is_game_over) return;
    const keyName = event.key;
    console.log('Событие keydown: ' + keyName);

    // убраны странные условия на max_width
    if (keyName === 'ArrowLeft' && !is_collision(-1, 0)) {
        x -= SQ_SIZE;
    }

    // убраны странные условия на max_width
    if (keyName === 'ArrowRight' && !is_collision(1, 0)) {
        x += SQ_SIZE;
    }
    if (keyName === 'ArrowUp') {
        // повернуть
        // проверить на коллизию
        // если ок, то ничего не делать
        // если не ок, то вернуть как было
        const temp_figure = current_figure
        current_figure = turn(current_figure);
        if (is_collision(0, 0)) {
            current_figure = temp_figure;
        }
    }
    if (keyName === 'ArrowDown' && !is_collision(0, 1)) {
        y += SQ_SIZE;
    }
    draw_full_figure();
    draw_lines();
});
const arr = new Array();
for (let i = 0; i < MAX_HEIGHT / SQ_SIZE; i++) {
    arr[i] = new Array(MAX_WIDTH / SQ_SIZE);
    for (let j = 0; j < MAX_WIDTH / SQ_SIZE; j++) {
        arr[i][j] = 0;
    }
}


function save() {
    console.log(current_figure)
    for (let i = 0; i < current_figure.length; i++) {
        for (let j = 0; j < current_figure[0].length; j++) {
            if (current_figure[i][j] === 1 && y >= 0) {
                arr[y / SQ_SIZE + j][x / SQ_SIZE + i] = current_color;
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
                draw(j * SQ_SIZE, i * SQ_SIZE, arr[i][j])
            }
        }
    }
}

let count_row = 0;
function delete_row() {
    for (let i = 0; i < arr.length; i++) {
        let count = 0;
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 0) {
                count++;
            }
        }
        if (count === 0) {
            // прокачано удаление строк
            const empty_row = new Array(arr[0].length).fill(0);
            arr.splice(i, 1);
            arr.unshift(empty_row);
            count_row++;
            document.getElementById("count_row").innerHTML = count_row;
            console.log(count_row);
        }
    }
}

function is_collision(dx, dy) {
    for (let i = 0; i < current_figure.length; i++) {
        for (let j = 0; j < current_figure[0].length; j++) {
            if (current_figure[i][j] === 1 && y >= 0) {
                // дописана коллизия
                const calculated_x = x + (i + dx) * SQ_SIZE;
                const calculated_y = y + (j + dy + 1) * SQ_SIZE;
                if (
                    calculated_y > MAX_HEIGHT ||
                    calculated_x < 0 || calculated_x > MAX_WIDTH
                ) {
                    return true;
                }
                if (arr[y / SQ_SIZE + j + dy][x / SQ_SIZE + i + dx] !== 0) {
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


const interval = setInterval(() => {
    draw_full_figure();
    delete_row();
    draw_lines();
    if (is_stop()) {
        console.log('!game over!')
        clearInterval(interval)
        is_game_over = true
    }

    // убраны странные условия на max_height
    if (!is_collision(0, 1)) {
        y += SQ_SIZE;
    } else {
        save();
        console.log(arr);
        current_figure = figure();

        y = -SQ_SIZE * (height_figure() + 1);
        // y = 0
        x = SQ_SIZE;
        console.log('save');
    }
}, 500);


current_figure = figure();
y = -SQ_SIZE * height_figure()

draw_lines();
