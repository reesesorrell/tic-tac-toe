const gameBoard = (() => {
    //create original empty game board
    let boardArray = [[null, 'X', null, null],[null, null, null],[null, null, null]]

    //return current board state
    const getBoard = () => boardArray;

    //return all public module functions and objects
    return {getBoard};
})();

const displayController = (() => {
    const gridArea = document.querySelector('.grid')

    //create 9 buttons in order of the board array with the content of the 3x3 array
    const createBoard = (boardArray) => {
        for (let row=0; row<=2; row++) {
            for (let column=0; column<=2; column++) {
                const newSpace = document.createElement('button');
                if (boardArray[row][column]) {
                    newSpace.textContent = boardArray[row][column];
                }
                gridArea.appendChild(newSpace);
            }
        }
    }
    return {createBoard}
})();

displayController.createBoard(gameBoard.getBoard())