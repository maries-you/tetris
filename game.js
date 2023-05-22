const SQ_SIZE = 30;
const SQ_SIZE_next_figure = 30;
const MAX_HEIGHT = 600;
const MAX_WIDTH = 300;
const maxHightNetx = 120
const maxWidthNext = 150
let is_game_over = false;
const canvas = document.getElementById('canvasid');
const canvasNextFigure = document.getElementById('nextFigure');

const keyRestart = document.querySelector("#restart") 
keyRestart.addEventListener('click', function() {
    location.reload();
})

let x = SQ_SIZE;
let y = 0;
// рисует сетку на поле 
function draw_lines(){                           
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#dfe2e8'

    for (let i = 0; i < MAX_WIDTH/SQ_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(SQ_SIZE * i, 0);
        ctx.lineTo(SQ_SIZE * i, MAX_HEIGHT);
        ctx.stroke();  
    }
    for (let j = 0; j < MAX_HEIGHT/SQ_SIZE; j++){
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

let listFigure = [] // буфер фигур
// первичное заполнение буфера фигурами
if (listFigure.concat.length<2){
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

let next_figure //................................. следующая фигурa

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
    if(pause==false){
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "#555555";
        ctx.fillRect(x, y, SQ_SIZE, SQ_SIZE);
        ctx.fillStyle = color;
        ctx.fillRect(x + 2, y + 2, SQ_SIZE - 6, SQ_SIZE - 6);
    }
}
}

function clear() {
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    }
}

function draw_full_figure() {
    if(pause==false){
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
}
// функции следующей фигуры
let arrNext = new Array(); // array plus pole
for (let i = 0; i < 150/ SQ_SIZE_next_figure; i++) {
    arrNext[i] = new Array(150/SQ_SIZE_next_figure);
    for (let j = 0; j < 150 / SQ_SIZE_next_figure; j++) {
        arrNext[i][j] = 0;
    }
}
function restoreNext() {
    for (let i = 0; i < arrNext.length; i++) {
        for (let j = 0; j < arrNext[0].length; j++) {
            if (arrNext[i][j] !== 0) {
                drawNext(j , i , arrNext[i][j])
            }
        }
    }
}
function drawNext(x, y, color) {
    if (canvasNextFigure.getContext) {
        let ctx = canvasNextFigure.getContext('2d');
        ctx.fillStyle = "#454545";
        ctx.fillRect(x, y, SQ_SIZE_next_figure+2, SQ_SIZE_next_figure); // рисует квадрат заливки 
        ctx.fillStyle = color;
        ctx.fillRect(x +1, y+1 , SQ_SIZE_next_figure-6 , SQ_SIZE_next_figure-6);
    }
}

function clearNext() {
    if (canvasNextFigure.getContext) {
        let ctx = canvasNextFigure.getContext('2d');
        ctx.clearRect(0, 0,maxWidthNext, maxHightNetx);
    }
}

function  drawNextFigure(){
    clearNext()
    restoreNext();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (next_figure[i][j] === 1) {
                drawNext(x + i * SQ_SIZE_next_figure, y + j * SQ_SIZE_next_figure, current_color)
            }
        }
    }   
}

function width_figure() {
    let myArray = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (current_figure[i][j] === 1) {
                myArray.push(i);
            }
        }
    }
    return Math.max.apply(null, myArray);
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
let keyPause = document.querySelector("#pause")  
let pause = false 
// меняем переменную паузы.
function editPause (){       
    if (pause == false){
        pause = true
        return pause
    } else {
        pause = false 
        return pause
    }
}
// вызываем изменение переменной паузы кликом по кнопке 
keyPause.addEventListener("click", editPause) 
// объект уровень, значения в начале игры
const level = {levelNumber:1, timeOfTurn:1000}  

let outSpeedInfo = document.querySelector("#outSpeed")   
let keySpeedUp = document.querySelector("#plusSpeed")
let keySpeedDown = document.querySelector("#minusSpeed")

// список скоростей
    // список времени ожидения хода фигуры
const blockLevel  = [1,2,3,4,5]     
const blockTimeOfTurn = [1000,650,500,300,160]  

function plusGameSpeed(){
 if (level.levelNumber<5){
    level.levelNumber = level.levelNumber + 1
    level.timeOfTurn = blockTimeOfTurn[level.levelNumber-1]

    document.getElementById("outSpeed").innerHTML = level.levelNumber
    console.log(level.timeOfTurn)
    console.log(level)

    clearInterval(interval)
    interval = setInterval (funcInterval, level.timeOfTurn )
    }
}

function minusGameSpeed(){
    if (level.levelNumber>1){
        level.levelNumber = level.levelNumber - 1
        level.timeOfTurn = blockTimeOfTurn[level.levelNumber-1]
    
        document.getElementById("outSpeed").innerHTML = level.levelNumber
        console.log(level.timeOfTurn)
        console.log(level)

        clearInterval(interval)
        interval = setInterval (funcInterval, level.timeOfTurn )
    }
}

keySpeedUp.addEventListener("click", plusGameSpeed)
keySpeedDown.addEventListener("click", minusGameSpeed)

document.addEventListener('keydown', (event) => {
    if (is_game_over) return;
    const keyName = event.key;
    console.log('Событие keydown:' + keyName);
    if(pause==false){
    
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
        let temp_figure = current_figure
        current_figure = turn(current_figure);
        if (is_collision(0, 0)){
            current_figure = temp_figure;
        }
        
    }
    if (keyName === 'ArrowDown' && !is_collision(0, 1)) {
        y += SQ_SIZE;
    }
                                           
    }           
    draw_full_figure();
    draw_lines();
});

document.addEventListener('key', (event) => {
    if (is_game_over) return;
                    const keyName = event.key;
    console.log('Событие keydown: ' + keyName);
                    if(pause==false){
    
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
        let temp_figure = current_figure
        current_figure = turn(current_figure);
        if (is_collision(0, 0)){
            current_figure = temp_figure;
        }
        
    }
    if (keyName === 'ArrowDown' && !is_collision(0, 1)) {
        y += SQ_SIZE;
    }                                                    
    }
    draw_full_figure();
    draw_lines();
});
                                    
let arr = new Array();
for (let i = 0; i < MAX_HEIGHT / SQ_SIZE; i++) {
    arr[i] = new Array(MAX_WIDTH / SQ_SIZE);
    for (let j = 0; j < MAX_WIDTH / SQ_SIZE; j++) {
        arr[i][j] = 0;
    }
}

function save() {
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

function restore() {                            // сохранение поставленной фигуры
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] !== 0) {
                draw(j * SQ_SIZE, i * SQ_SIZE, arr[i][j])

            }
       }
    }
}

let conutRow = {count:0, nextLevelCount:2}   // счетчик очков (линий)/ переменная, для блокировки авторазнога уровня сразу до максиума 
   
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
            let empty_row = new Array(arr[0].length).fill(0);
            arr.splice(i, 1);
            arr.unshift(empty_row); 
            conutRow.count++;
            
            document.getElementById("count_row").innerHTML = conutRow.count;
            console.log(conutRow.count);
            return conutRow.count
        }

        if (conutRow.count==5 && conutRow.nextLevelCount == 2 ){      // АВТОМАТИЧЕСКОЕ накидывание уровня 
            plusGameSpeed()
            conutRow.nextLevelCount++
    
            console.log('nextLevelConnt')
            console.log(conutRow.nextLevelCount)
        }
            if (conutRow.count==10 && conutRow.nextLevelCount == 3 ){
                plusGameSpeed()
                conutRow.nextLevelCount++
        
                console.log('nextLevelConnt')
                console.log(conutRow.nextLevelCount)
        
        }
        if (conutRow.count==15 && conutRow.nextLevelCount == 4 ){
            plusGameSpeed()
            conutRow.nextLevelCount++
    
            console.log('nextLevelConnt')
            console.log(conutRow.nextLevelCount)
    
        }
        if (conutRow.count==20 && conutRow.nextLevelCount == 5 ){
            plusGameSpeed()
            conutRow.nextLevelCount++
    
            console.log('nextLevelConnt')
            console.log(conutRow.nextLevelCount)
        }
    }
}

function is_collision(dx, dy) {
    for (let i = 0; i < current_figure.length; i++) {
        for (let j = 0; j < current_figure[0].length; j++) {
            if (current_figure[i][j] === 1 && y >= 0) {
                //дописана коллизия
                let calculated_x = x + (i + dx) * SQ_SIZE;
                let calculated_y = y + (j + dy + 1) * SQ_SIZE;
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
    let result = [];
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

let turnNextFigure = 0   // счетчик подачи след. фигуры 
function funcInterval () {
    if(pause== false){                           // пауза в игре
    draw_full_figure();
    delete_row();
    draw_lines();

    if(turnNextFigure<4){
        drawNextFigure()
        turnNextFigure++
    }
    // убраны странные условия на max_height
    if (!is_collision(0, 1)) {
        y += SQ_SIZE;
    } else {
        save();
        console.log(arr);
        current_figure = figure(); 
        next_figure 
        if (is_stop()) {
            alert('!game over!')  // сообщение о конце игры 
            clearInterval(interval)
            is_game_over = true
        }
        y = -SQ_SIZE * (height_figure() + 1);
        x = SQ_SIZE;
        console.log('save');
    }  
}
}
let  interval = setInterval (funcInterval, level.timeOfTurn ) // таймер обновления шага фигуры                             

current_figure = figure()  // следующая фигура, что пойдет - самая первая фигура.
y = -SQ_SIZE * height_figure()
draw_lines()