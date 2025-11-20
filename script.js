document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('public-figure');
    const scoreBoard = document.getElementById('score-board');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const finalScoreDisplay = document.getElementById('final-score');
    const monumentBackground = document.getElementById('monument-background'); 
    
    // GET AUDIO ELEMENTS
    const gameMusic = document.getElementById('game-music');
    const gameOverSound = document.getElementById('game-over-sound'); // NEW: Get the game over audio

    // --- ULTIMATE EASIEST MODE Game Configuration (Unchanged) ---
    let playerY = 250;
    let gravity = 0.05;    
    let velocity = 0;
    const jumpPower = -3;    
    const gameWidth = 380;
    const gameHeight = 600;
    const pipeWidth = 60;
    const pipeGap = 350; 
    const obstacleSpeed = 1.0; 
    const obstacleSpawnTime = 2500; 

    // Background animation variable
    let backgroundPositionX = 0; 
    const backgroundScrollSpeed = 0.5; 

    let score = 0;
    let isGameOver = false;
    let gameLoopInterval;
    let obstacleGenerationInterval;
    
    // List of "rights" to display on the obstacles
    const rightsIssues = [
        "Poor Quality Roads", 
        "Lack of Good Education", 
        "Food Security Issues", 
        "Safety Concerns",
        "Healthcare Access", 
        "Unemployment"
    ];

    // --- Game Logic ---

    function startGame() {
        // Reset state
        isGameOver = false;
        score = 0;
        playerY = 250;
        velocity = 0;
        player.style.top = playerY + 'px';
        scoreBoard.textContent = 'Score: 0';
        
        // Clear old obstacles
        document.querySelectorAll('.obstacle-set').forEach(pipe => pipe.remove());

        // Hide screens and start the game loops
        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        gameLoopInterval = setInterval(gameLoop, 20);
        obstacleGenerationInterval = setInterval(generateObstacle, obstacleSpawnTime); 
        
        // Start Game Music
        gameMusic.play();
        
        // Ensure game over sound is reset
        gameOverSound.pause();
        gameOverSound.currentTime = 0;
        
        // Attach controls
        document.addEventListener('click', jump);
    }
    
    function gameLoop() {
        if (isGameOver) return;

        // Apply gravity and update position
        velocity += gravity;
        playerY += velocity;
        player.style.top = playerY + 'px';

        // Add rotation effect
        const rotation = Math.min(Math.max(velocity * 1.5, -45), 45); 
        player.style.transform = `rotate(${rotation}deg)`;

        // Check for ground/ceiling collision
        if (playerY > gameHeight - 30 || playerY < 0) {
            endGame();
        }

        // Monument Background Animation Logic:
        backgroundPositionX -= backgroundScrollSpeed; 
        monumentBackground.style.backgroundPositionX = backgroundPositionX + 'px';

        // Move and check obstacle collisions
        document.querySelectorAll('.obstacle-set').forEach(obstacle => {
            let obstacleX = parseFloat(obstacle.style.left);
            obstacleX -= obstacleSpeed; 
            obstacle.style.left = obstacleX + 'px';

            // Check if obstacle has been passed and update score
            if (obstacleX < 50 && !obstacle.passed) {
                score++;
                scoreBoard.textContent = 'Score: ' + score;
                obstacle.passed = true;
            }

            // Remove off-screen obstacle
            if (obstacleX < -pipeWidth) {
                obstacle.remove();
            }

            // Check for collision
            if (
                obstacleX < 80 && 
                obstacleX + pipeWidth > 50
            ) {
                const topPipeHeight = parseFloat(obstacle.querySelector('.obstacle-top').style.height);
                const bottomPipeHeight = parseFloat(obstacle.querySelector('.obstacle-bottom').style.height);

                if (playerY < topPipeHeight || playerY > gameHeight - bottomPipeHeight - 30) {
                    endGame();
                }
            }
        });
    }

    function jump(event) {
        // Only jump if click is inside the game container and game is running
        if (event.target.id === 'game-container' || event.target.id === 'public-figure' || event.target.tagName === 'BODY') {
            if (!isGameOver && startScreen.style.display === 'none') {
                velocity = jumpPower;
            }
        }
    }

    function generateObstacle() {
        const minHeight = 50;
        const maxGapCenter = gameHeight - minHeight - pipeGap / 2;
        const randomCenter = Math.floor(Math.random() * (maxGapCenter - pipeGap / 2 - minHeight) + minHeight + pipeGap / 2);
        
        const topHeight = randomCenter - pipeGap / 2;
        const bottomHeight = gameHeight - (randomCenter + pipeGap / 2);

        // Select a random issue label
        const issueLabel = rightsIssues[Math.floor(Math.random() * rightsIssues.length)];

        const obstacleSet = document.createElement('div');
        obstacleSet.className = 'obstacle-set';
        obstacleSet.style.left = gameWidth + 'px';
        obstacleSet.passed = false; 

        const obstacleTop = document.createElement('div');
        obstacleTop.className = 'obstacle-top';
        obstacleTop.style.height = topHeight + 'px';
        obstacleTop.setAttribute('data-label', issueLabel); 

        const obstacleBottom = document.createElement('div');
        obstacleBottom.className = 'obstacle-bottom';
        obstacleBottom.style.height = bottomHeight + 'px';
        obstacleBottom.setAttribute('data-label', issueLabel); 

        obstacleSet.appendChild(obstacleTop);
        obstacleSet.appendChild(obstacleBottom);
        gameContainer.appendChild(obstacleSet);
    }

    function endGame() {
        isGameOver = true;
        clearInterval(gameLoopInterval);
        clearInterval(obstacleGenerationInterval);
        document.removeEventListener('click', jump);
        
        // Stop Game Music
        gameMusic.pause();
        gameMusic.currentTime = 0; 
        
        // START GAME OVER SOUND (New functionality)
        gameOverSound.play();

        finalScoreDisplay.textContent = 'You successfully passed ' + score + ' unfulfilled rights issues.';
        gameOverScreen.style.display = 'flex';
    }

    // --- Event Listeners (Unchanged) ---

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    gameContainer.addEventListener('click', (e) => {
        // If the click is on the game container and game hasn't started, start it
        if (e.target.id === 'game-container' && startScreen.style.display !== 'none') {
            startGame();
        }
    });

    // Handle jump on click anywhere in the game area once started
    document.addEventListener('click', jump);
    // Remove default jump listener for initial screen
    document.removeEventListener('click', jump); 
});