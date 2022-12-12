const gameBoard = (() => {
    //create original empty game board
    let boardArray = [[null, null, null],[null, null, null],[null, null, null]]

    //return current board state
    const getBoard = () => boardArray;

    //return all public module functions and objects
    return {getBoard};
})();

const displayController = (() => {
    
})();