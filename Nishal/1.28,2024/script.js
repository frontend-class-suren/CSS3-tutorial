const gameArea = document.querySelector('.game-area');
const gridSize = 20;
const cellSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;

function drawGrid() {
  gameArea.innerHTML = '';
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (isSnakeCell(x, y)) {
        if (x === snake[0].x && y === snake[0].y) {
          cell.classList.add('snake-head');
        } else {
          cell.classList.add('snake-body');
        }
      } else if (x === food.x && y === food.y) {
        cell.classList.add('food');
      }
      cell.style.width = cellSize + 'px';
      cell.style.height = cellSize + 'px';
      gameArea.appendChild(cell);
    }
  }
}

function isSnakeCell(x, y) {
  return snake.some(segment => segment.x === x && segment.y === y);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * gridSize);
  food.y = Math.floor(Math.random() * gridSize);
}

function gameLoop() {
  moveSnake();
  drawGrid();
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      dx = 0;
      dy = -1;
      break;
    case 'ArrowDown':
      dx = 0;
      dy = 1;
      break;
    case 'ArrowLeft':
      dx = -1;
      dy = 0;
      break;
    case 'ArrowRight':
      dx = 1;
      dy = 0;
      break;
  }
});

setInterval(gameLoop, 200);
