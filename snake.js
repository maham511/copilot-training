let canvas = document.getElementById('gameCanvas'); // Get the canvas element
let context = canvas.getContext('2d'); // Get the 2D rendering context for the canvas

let snake = [{x: 200, y: 200}]; // Initial snake position
let food = {x: 300, y: 300}; // Initial food position

let dx = 20; // Change in x-direction
let dy = 0; // Change in y-direction

let gameInterval; // Variable to store the game interval

// Function to update the game state
function update() {
    // Check if the snake has eaten the food
    if(snake[0].x === food.x && snake[0].y === food.y) {
        // Generate new food
        food = {
            x: Math.floor(Math.random() * 15 + 1) * 20,
            y: Math.floor(Math.random() * 15 + 1) * 20
        };
        // Add a new segment to the snake
        snake.push({});
    }

    // Update the position of the snake segments
    for(let i = snake.length - 1; i >= 0; i--) {
        if(i === 0) {
            // Move the head of the snake
            snake[i].x += dx;
            snake[i].y += dy;
        } else {
            // Move the segment to the position of the previous segment
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }
    }

    // Check for collision with self
    for(let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            clearInterval(gameInterval); // End the game
            return;
        }
    }

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, 20, 20);

    // Draw the snake
    context.fillStyle = 'green';
    for(let i = 0; i < snake.length; i++) {
        context.fillRect(snake[i].x, snake[i].y, 20, 20);
    }
}

// Function to change the direction of the snake
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -20;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -20;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 20;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 20;
    }
}

// Add the keyboard event listener
window.addEventListener("keydown", changeDirection);

gameInterval = setInterval(update, 200); // Update the game state every 200ms