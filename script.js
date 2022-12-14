const gameBoard = (() => {
    //create original empty game board
    let boardArray = [[null, null, null, null],[null, null, null],[null, null, null]]

    //return current board state
    const getBoard = () => boardArray;

    //return all public module functions and objects
    return {getBoard};
})();

const displayController = (() => {
    const gridArea = document.querySelector('.grid')

    let turnCounter = 0;

    //decides whose turn it is based off the turn counter
    const turnDecider = () => {
        if (turnCounter%2) {
            turnCounter++;
            return player2;
        }
        else {
            turnCounter++;
            return player1;
        }
    }

    //create 9 buttons in order of the board array with the content of the 3x3 array
    const updateBoard = (boardArray) => {
        for (let row=0; row<=2; row++) {
            for (let column=0; column<=2; column++) {
                //make buttons with rows and columns as their class
                const newSpace = document.createElement('button');
                newSpace.classList.add(row + ',' + column);

                newSpace.onclick = turnDecider();

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
    clickSpace = () => {
        console.log(name)
    }
    return {name, sign, clickSpace};
}

const player1 = playerCreater('Reese', 'X');
const player2 = playerCreater('Kacy', 'O');

displayController.updateBoard(gameBoard.getBoard())