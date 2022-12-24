const gameBoard = (() => {
    //create original empty game board
    let boardArray = [[null, null, null, null],[null, null, null],[null, null, null]]

    //return current board state
    const getBoard = () => boardArray;

    let turnCounter = 0;

    //calls decide turn to get the player who's turn it is
    //and finds the x and y of the button
    const makeMove = (button) => {
        let player = decideTurn();
        let x = button.classList[0][0];
        let y = button.classList[0][2];
        markSpace(x, y, player);
    }

    //decides who's turn it is by dividing turn counter by 2
    const decideTurn = () => {
        if (turnCounter%2) {
            return player2;
        }
        else {
            return player1;
        }
    }

    //makes a move if a space is empty given an x, y, and sign to fill the space with
    //also calls functions to check for wins or ties
    const markSpace = (x, y, player) => {
        if (!boardArray[x][y]) {
            boardArray[x][y] = player.sign;
            displayController.updateBoard(getBoard());

            //sets a delay so the board can update before a winner is declared
            setTimeout(() => {if (checkWin()) {
                displayController.displayWin(player);
                resetGame();
                }}, 200);

            //then checks for a tie
            setTimeout(() => {if (checkTie()) {
                displayController.displayTie();
                resetGame();
            }}, 200);
            turnCounter++;
        }
    }

    //checks to see if a player has won
    const checkWin = () => {
        for (let i=0; i<=2; i++) {
            if (boardArray[i][0]) {
                if (boardArray[i][0] == boardArray[i][1] && boardArray[i][0] == boardArray[i][2]) {
                    return true;
                }
            }
            if (boardArray[0][i]) {
                if (boardArray[0][i] == boardArray[1][i] && boardArray[0][i] == boardArray[2][i]) {
                    return true;
                }
            }
        }
        if (boardArray[1][1]) {
            if (boardArray[0][0] == boardArray[1][1] && boardArray[0][0] == boardArray[2][2]) {
                return true;
            }
            if (boardArray[0][2] == boardArray[1][1] && boardArray[0][2] == boardArray[2][0]) {
                return true;
            }
        }
    }

    //loops through and breaks when it finds an empty space
    const checkTie = () => {
        tieLoop:
        for (let row=0; row<=2; row++) {
            for (let column=0; column<=2; column++) {
                if (!boardArray[row][column]) {
                    break tieLoop
                }
                if (row==2 && column==2) {
                    return true;
                }
            }
        }
    }

    //resets the game board and then updates display
    const resetGame = () => {
        boardArray = [[null, null, null, null],[null, null, null],[null, null, null]]
        turnCounter = 0;
        displayController.updateBoard(boardArray);
    }

    //return all public module functions and objects
    return {getBoard, makeMove, resetGame};
})();

const displayController = (() => {
    const gridArea = document.querySelector('.grid')

    //create 9 buttons in order of the board array with the content of the 3x3 array
    const updateBoard = (boardArray) => {
        gridArea.innerHTML = '';
        for (let row=0; row<=2; row++) {
            for (let column=0; column<=2; column++) {
                //make buttons with rows and columns as their class
                const newSpace = document.createElement('button');
                newSpace.classList.add(row + ',' + column);

                newSpace.onclick = function() {gameBoard.makeMove(newSpace)};

                //set DOM content to the board array content
                if (boardArray[row][column]) {
                    newSpace.textContent = boardArray[row][column];
                }

                gridArea.appendChild(newSpace);
            }
        }
    }

    //create player form
    const getPlayers = () => {
        const playerForm = document.createElement('form');
        playerForm.id = 'player-form'
        playerForm.classList.add('player-form');
        createDiv(playerForm, 'player-form__label', 'Enter players information below: ')
        createDiv(playerForm, 'player-1-name-label', 'Player 1 Name: ');
        createInputForm(playerForm, 'player-1-name', 'player-1-name-input', 20);
        createDiv(playerForm, 'player-1-symbol-label', 'Player 1 Symbol: ');
        createInputForm(playerForm, 'player-1-symbol', 'player-1-symbol-input', 1);
        createDiv(playerForm, 'player-2-name-label', 'Player 2 Name: ');
        createInputForm(playerForm, 'player-2-name', 'player-2-name-input', 20);
        createDiv(playerForm, 'player-2-symbol-label', 'Player 2 Symbol: ');
        createInputForm(playerForm, 'player-2-symbol', 'player-2-symbol-input', 1);
        createInputButton(playerForm, 'submit-button', 'Submit');
        playerForm.addEventListener('submit', handleSubmit);
        document.body.appendChild(playerForm);
    }

    //handle player form submit
    const handleSubmit = (event) => {
        const player1Name = document.getElementById('player-1-name').value;
        const player1Symbol = document.getElementById('player-1-symbol').value;
        const player2Name = document.getElementById('player-2-name').value;
        const player2Symbol = document.getElementById('player-2-symbol').value;
        window.player1 = playerCreater(player1Name, player1Symbol);
        window.player2 = playerCreater(player2Name, player2Symbol);
        const playerForm = document.getElementById('player-form');
        playerForm.innerHTML = '';
        playerForm.remove();
        event.preventDefault();
    }

    //reset board and make new player form
    const changePlayers = () => {
        try {
            const playerForm = document.getElementById('player-form');
            playerForm.innerHTML = '';
            playerForm.remove();
        }
        finally {
            gameBoard.resetGame();
            getPlayers();
        }
    }
    
    //create player win window with a button that deletes it
    const displayWin = (player) => {
        const winWindow = createDiv(document.body, 'win-window', '');
        winWindow.id = 'win-window';
        createDiv(winWindow, 'win-window__message', player.name + ' wins!');
        createDiv(winWindow, 'play-again-message', 'Click below to play again:');
        const container = createDiv(winWindow, 'play-again-button-container', '');
        createButton(container, 'same-players-button', 'Same Players', destroyWinWindow);
        createButton(container, 'new-players-button', 'New Players', makeNewPlayers);
    }

    const displayTie = () => {
        const winWindow = createDiv(document.body, 'win-window', '');
        winWindow.id = 'win-window';
        createDiv(winWindow, 'win-window__message', "It's a tie!");
        createDiv(winWindow, 'play-again-message', 'Click below to play again:');
        const container = createDiv(winWindow, 'play-again-button-container', '');
        createButton(container, 'same-players-button', 'Same Players', destroyWinWindow);
        createButton(container, 'new-players-button', 'New Players', makeNewPlayers);
    }

    const destroyWinWindow = () => {
        const winWindow = document.getElementById('win-window');
        winWindow.innerHTML = ''
        winWindow.remove();
    }

    const makeNewPlayers = () => {
        destroyWinWindow();
        getPlayers();
    }

    //basic functions that create divs and inputs
    const createDiv = (parentForm, divClass, text) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add(divClass);
        newDiv.textContent = text;
        parentForm.appendChild(newDiv);
        return newDiv;
    }

    const createInputForm = (parentForm, value, inputClass, maxLength) => {
        const newInput = document.createElement('input');
        newInput.name = value;
        newInput.type = 'text';
        newInput.id = value;
        newInput.required = true;
        newInput.maxLength = maxLength;
        newInput.classList.add(inputClass);
        parentForm.appendChild(newInput);
        return newInput;
    }

    const createInputButton = (parentForm, buttonClass, text) => {
        const newButton = document.createElement('button');
        newButton.type = 'submit';
        newButton.textContent = text;
        newButton.classList.add(buttonClass);
        newButton.style.display = 'block';
        parentForm.appendChild(newButton);
    }

    const createButton = (parentForm, buttonClass, text, onClick) => {
        const newButton = document.createElement('button');
        newButton.textContent = text;
        newButton.classList.add(buttonClass);
        newButton.onclick = onClick;
        parentForm.appendChild(newButton);
    }

    return {updateBoard, getPlayers, changePlayers, displayWin, displayTie}
})();

//creates a player object with a name and a sign for the board
const playerCreater = (name, sign) => {
    return {name, sign};
}

//create the first board
displayController.updateBoard(gameBoard.getBoard())

displayController.getPlayers();