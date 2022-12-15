const gameBoard = (() => {
    //create original empty game board
    let boardArray = [[null, null, null, null],[null, null, null],[null, null, null]]

    //return current board state
    const getBoard = () => boardArray;

    let turnCounter = 0;

    //calls decide turn to get the mark of the player who's turn it is
    //finds the x and y of the button and calls the mark space on it
    const makeMove = (button) => {
        let mark = decideTurn().sign;
        let x = button.classList[0][0];
        let y = button.classList[0][2];
        markSpace(x, y, mark);
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
    const markSpace = (x, y, sign) => {
        if (!boardArray[x][y]) {
            boardArray[x][y] = sign;
            checkWin();
            turnCounter++;
            displayController.updateBoard(getBoard());
        }
    }

    //checks to see if a player has won
    const checkWin = () => {
        for (let i=0; i<=2; i++) {
            if (boardArray[i][0]) {
                if (boardArray[i][0] == boardArray[i][1] && boardArray[i][0] == boardArray[i][2]) {
                    console.log('WINNER');
                }
            }
            if (boardArray[0][i]) {
                if (boardArray[0][i] == boardArray[1][i] && boardArray[0][i] == boardArray[2][i]) {
                    console.log('WINNER');
                }
            }
        }
        if (boardArray[1][1]) {
            if (boardArray[0][0] == boardArray[1][1] && boardArray[0][0] == boardArray[2][2]) {
                console.log('WINNER');
            }
            if (boardArray[0][2] == boardArray[1][1] && boardArray[0][2] == boardArray[2][0]) {
                console.log('WINNER');
            }
        }
    }

    //return all public module functions and objects
    return {getBoard, makeMove};
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
    return {updateBoard}
})();

const playerCreater = (name, sign) => {
    return {name, sign};
}

const player1 = playerCreater('Reese', 'X');
const player2 = playerCreater('Kacy', 'O');

displayController.updateBoard(gameBoard.getBoard())