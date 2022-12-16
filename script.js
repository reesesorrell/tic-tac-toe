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
                alert(player.name + " wins!");
                resetGame();
                }}, 200);

            //then checks for a tie
            setTimeout(() => {if (checkTie()) {
                alert("It's a tie.")
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
        playerForm.classList.add('player-form');
        createDiv(playerForm, 'player1NameLabel', 'Player 1 Name: ');
        createInputForm(playerForm, 'player1Name', 'player1NameInput');
        createDiv(playerForm, 'player1SymbolLabel', 'Player 1 Symbol: ');
        createInputForm(playerForm, 'player1Symbol', 'player1SymbolInput');
        createDiv(playerForm, 'player2NameLabel', 'Player 2 Name: ');
        createInputForm(playerForm, 'player2Name', 'player2NameInput');
        createDiv(playerForm, 'player2SymbolLabel', 'Player 2 Symbol: ');
        createInputForm(playerForm, 'player2Symbol', 'player2SymbolInput');
        createInputButton(playerForm, 'submitButton');
        document.body.appendChild(playerForm);
    }
    

    //basic functions that create divs and inputs
    const createDiv = (playerForm, divClass, text) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add(divClass);
        newDiv.textContent = text;
        playerForm.appendChild(newDiv);
    }

    const createInputForm = (playerForm, value, inputClass) => {
        const newInput = document.createElement('input');
        newInput.name = value;
        newInput.classList.add(inputClass);
        playerForm.appendChild(newInput);
    }

    const createInputButton = (playerForm, buttonClass) => {
        const newButton = document.createElement('input');
        newButton.type = 'button';
        newButton.classList.add(buttonClass);
        playerForm.appendChild(newButton);
    }

    return {updateBoard, getPlayers}
})();

//creates a player object with a name and a sign for the board
const playerCreater = (name, sign) => {
    return {name, sign};
}

//create the two intial players
const player1 = playerCreater('Reese', 'X');
const player2 = playerCreater('Kacy', 'O');

//create the first board
displayController.updateBoard(gameBoard.getBoard())