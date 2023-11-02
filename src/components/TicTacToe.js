import React, { useState } from "react";

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);

    const handleCellClick = (index) => {
        if (winner || board[index]){
            return;
        }

        const newBoard = [...board];
        newBoard[index] = currentPlayer;

        setBoard(newBoard);

        const isDraw = checkForDraw(newBoard);
        const newWinner = checkForWinner(newBoard);
        if(isDraw){
            setWinner('draw');
            // sleep for 1 sec and reset
            setTimeout(() => resetGame(), 1500);
            return;
        }

        if(newWinner){
            setWinner(newWinner);
        }else{
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    const checkForWinner = (board) => {
        // list all winnable combinations
        const COMBINATIONS = [
            [0,1,2],[3,4,5],[6,7,8], //rows
            [0,3,6],[1,4,7],[2,5,8], //columns
            [0,4,8],[2,4,6]
        ];

        for(let combo of COMBINATIONS){
            const [a,b,c] = combo;
            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                console.log(board[a]);
                return board[a];
            }
        }

        return null;
    };

    const checkForDraw = (board) => {
        for(let x of board){
            console.log(x);
            if(x == null){
                return false;
            }
        }

        if(!checkForWinner(board)){
            return true;
        }

    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer('X');
    };


    return (
        <div className="App">
            <header className="App-header">
                <h1>Tic Tac Toe</h1>
                    <div className="row">
                        <div className="board">
                            {
                            board.map((cell, index) => (
                                <div key={index} className="cell" onClick={() => handleCellClick(index)}>{cell}</div>
                            ))
                            }
                        </div>
                        <div className="column">
                            <div className="text">
                                {winner ? `Winner: ${winner}` : `Next Player: ${currentPlayer}`}
                            </div>
                            <button className="reset_button" onClick={resetGame}>Reset Game</button>
                        </div>
                    </div>
            </header>
        </div>
    );
}

export default TicTacToe;