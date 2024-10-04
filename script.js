let gameArea = document.getElementById('gameArea');
let player = document.getElementById('player');
let startBtn = document.getElementById('startBtn');
let scoreDisplay = document.getElementById('score');
let playerSpeed = 20;
let score = 0;
let gameInterval;
let fallingObject;

document.addEventListener('keydown', movePlayer);

function movePlayer(e) {
    let playerPos = player.offsetLeft;
    if (e.key === 'ArrowLeft' && playerPos > 0) {
        player.style.left = (playerPos - playerSpeed) + 'px';
    } else if (e.key === 'ArrowRight' && playerPos < 420) {
        player.style.left = (playerPos + playerSpeed) + 'px';
    }
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    fallingObject = document.createElement('div');
    fallingObject.id = 'fallingObject';
    gameArea.appendChild(fallingObject);
    startBtn.classList.remove('active');
    gameInterval = setInterval(updateGame, 20);
}

function updateGame() {
    let objectTop = fallingObject.offsetTop;
    if (objectTop > 600) {
        let objectLeft = Math.random() * 450;
        fallingObject.style.left = objectLeft + 'px';
        fallingObject.style.top = '-50px';
        score++;
        scoreDisplay.textContent = "Score: " + score;
    } else {
        fallingObject.style.top = objectTop + 5 + 'px';
    }

    let objectRect = fallingObject.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();
    if (isCollide(objectRect, playerRect)) {
        clearInterval(gameInterval);
        fallingObject.remove();
        startBtn.classList.add('active');
    }
}

function isCollide(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

startBtn.addEventListener('click', startGame);
startBtn.classList.add('active');
