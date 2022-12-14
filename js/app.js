document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const width = 28; // 28 x 28 = 784 squares
    let score = 0;

    // layout of grid and what is in the squares
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = []

    // Legend
    // 0 - pac-dot
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

    // Draw the grid and render it
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement("div");
            grid.appendChild(square);
            squares.push(square);

            // add layout to the board
            if (layout[i] === 0) {
                squares[i].classList.add("pac-dot");
            } else if (layout[i] === 1) {
                squares[i].classList.add("wall");
            } else if (layout[i] === 2) {
                squares[i].classList.add("ghost-lair");
            } else if (layout[i] === 3) {
                squares[i].classList.add("power-pellet");
            } else if (layout[i] === 4) {
                squares[i].classList.add("empty");
            } 
        }
    }
    createBoard();

    // Starting position of pac-man
    let pacmanCurrentIndex = 490;

    squares[pacmanCurrentIndex].classList.add("pac-man");

    // Move pac-man
    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove("pac-man");
        checkForWin();

        switch(e.keyCode) {
            case 37:
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains("wall")
                && !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair"))
                pacmanCurrentIndex -=1;
                // check if pac-man is in the left exit
                if(pacmanCurrentIndex - 1 == 363) pacmanCurrentIndex +=(width - 1);
                break;
            case 38:
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains("wall")
                && !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair"))
                pacmanCurrentIndex -=width;
                break;
            case 39:
                if(pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains("wall")
                && !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair"))
                pacmanCurrentIndex +=1;
                // check if pac-man is in the right exit
                if(pacmanCurrentIndex + 1 == 392) pacmanCurrentIndex -=(width - 1);
                break;
            case 40:
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains("wall")
                && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair"))
                pacmanCurrentIndex +=width;
                break;
        }
        squares[pacmanCurrentIndex].classList.add("pac-man");

        pacDocEaten();
        powerPelletEaten()
        checkForGameover()
        checkForWin()
    }

    document.addEventListener("keyup", movePacman);

    function pacDocEaten() {
        if(squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
            squares[pacmanCurrentIndex].classList.remove("pac-dot");
            score++;
            scoreDisplay.innerHTML = score;
        }
    }

    function powerPelletEaten() {
        if(squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
            squares[pacmanCurrentIndex].classList.remove("power-pellet");
            score += 10;
            scoreDisplay.innerHTML = score;
           
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unScareGhosts, 12000);
        }
    }

    // make the ghost normal again
    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    function checkForWin() {
        if (score == 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerID));
            document.removeEventListener("keyup", movePacman);
            scoreDisplay.innerHTML = " YOU WON!"
        }
    }

    // Create the Ghost template
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerID = NaN;
            this.isScared = false;
        }
    }

    const ghosts = [
        new Ghost("blinky", 348, 100),
        new Ghost("pinky", 376, 250),
        new Ghost("inky", 351, 150),
        new Ghost("clyde", 379, 350)
    ]

    // Draw the ghosts onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add("ghost");
    })

    // Move the ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost));

    // Write the function to moves the ghosts
    function moveGhost(ghost) {
        const directions = [+1, -1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        ghosts.timerID = setInterval(function() {
            // if the next square your ghost is going to go in does NOT contain a wall and a ghost, you can go there
            if(!squares[ghost.currentIndex + direction].classList.contains("wall") && !squares[ghost.currentIndex + direction].classList.contains("ghost")) {
                // you can go here
                // remove all ghost related classes
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
                // change the currentIndex to the new safe square
                ghost.currentIndex += direction
                // redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
                // else, try a new direction   
            } else direction = directions[Math.floor(Math.random() * directions.length)];

            if(ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost");
            } 
            if(!ghost.isScared) {
                squares[ghost.currentIndex].classList.remove("scared-ghost");
            }
            if(ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            }
            checkForGameover();
        }, ghost.speed);
    }

    // check for a game over
    function checkForGameover() {
        if(squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            ghosts.forEach(ghost => clearInterval(ghost.timerID));
            document.removeEventListener("keyup", movePacman);
            scoreDisplay.innerHTML = " GAME OVER"
        }
    }







});

