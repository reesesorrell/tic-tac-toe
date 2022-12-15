const gameBoard = (() => {
    //create original empty game board
    let boardArray = [[null, null, null, null],[null, null, null],[null, null, null]]

    //return current board state
    const getBoard = () => boardArray;

    let turnCounter = 0;

    //decides whose turn it is based off the turn counter
    const turnDecider = (button) => {
        if (turnCounter%2) {
            player2.clickSpace(button);
        }
        else {
            player1.clickSpace(button);
        }
    }

    const makeMove = (x, y, sign) => {
        if (!boardArray[x][y]) {
            boardArray[x][y] = sign;
            turnCounter++;
            checkWin();
            displayController.updateBoard(getBoard());
        }
    }

    const checkWin = () => {
        console.log('working');
    }

    //return all public module functions and objects
    return {getBoard, turnDecider, makeMove};
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

                newSpace.onclick = function() {gameBoard.turnDecider(newSpace)};

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
    clickSpace = (button) => {
        let x = button.classList[0][0];
        let y = button.classList[0][2];
        gameBoard.makeMove(x, y, sign);
    }
    return {name, sign, clickSpace};
}

const player1 = playerCreater('Reese', 'X');
const player2 = playerCreater('Kacy', 'O');

displayController.updateBoard(gameBoard.getBoard())