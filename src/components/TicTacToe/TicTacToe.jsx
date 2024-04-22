import React, { useState } from 'react'
import './TicTacToe.css'
import circle from '../Assets/circle.png'
import cross from '../Assets/cross.png'
import Strike from '../Strike/Strike'

const TicTacToe = () => {
    let [currentPlayer, setCurrentPlayer] = useState("x");
    let [lock, setLock] = useState(false);
    let [message, setMessage] = useState();
    let [countX, setCountX] = useState(0);
    let [countO, setCountO] = useState(0);
    let [strikethrough, setStrikethrough] = useState('')
    let [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

    const toggle = (e, index) => { // If board is unlocked, store current player, display current player's symbol on the tile, check for win
        if (lock || board[index] !== "") return;
        board[index] = currentPlayer;
        if (currentPlayer === "x") {
            e.target.innerHTML = `<img src=${cross} />`;
            setCurrentPlayer("o");
        } else {
            e.target.innerHTML = `<img src=${circle} />`;
            setCurrentPlayer("x");
        }
        checkWin(board);
    }

    const checkWin = (board) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  //columns
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  //rows
            [0, 4, 8], [6, 4, 2]              //diagonals
        ]
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                won(board[a]);
                setStrikethrough("strike-" + condition.join('-'));
                return;
            }
            if (!board.includes("")) won(null);
        };
    }

    const won = (winner) => { // If a win codition has been met, lock board, display congratulations message, wait 2.5s and clear the board for new round
        setLock(true);
        if (winner === "x") {
            setMessage(<h1 className='title'>Congratulations: <img src={cross} className='winnerLogo' alt='cross' /> won!</h1>);
            setCountX(countX + 1);
        } else if (winner === "o") {
            setMessage(<h1 className='title'>Congratulations: <img src={circle} className='winnerLogo' alt='circle' /> won!</h1>);
            setCountO(countO + 1);
        } else if (!winner) {
            setMessage(<h1 className='title'>Draw!</h1>)
        };
        setTimeout(() => {
            setLock(false);
            setMessage(null);
            setStrikethrough('');
            setBoard(["", "", "", "", "", "", "", "", ""]);
            document.querySelectorAll(".box").forEach((element) => element.innerHTML = '');

        }, 2500);
    }

    const reset = () => {
        setLock(false);
        setMessage(null);
        setStrikethrough('');
        setBoard(["", "", "", "", "", "", "", "", ""]);
        document.querySelectorAll(".box").forEach((element) => element.innerHTML = '');
        setCountO(0);
        setCountX(0);
    }

    const grid = [0, 1, 2].map(columnIndex => (
        <div key={columnIndex} className={`column${columnIndex + 1}`}>
            {[0, 1, 2].map(rowIndex => (
                <div key={rowIndex} className="box" onClick={(e) => { toggle(e, columnIndex * 3 + rowIndex) }}></div>
            ))}
        </div>
    ))

    return (
        <div className='container'>
            {message ?
                message :
                <h1 className='title'>Tic Tac Toe Game <span>React</span></h1>
            }
            <div className="board">
                {strikethrough ? <Strike strikethrough={strikethrough} /> : null}
                {grid}
            </div>
            <div className="stats">
                <div className="xStats">
                    <h1>X-{countX}</h1>
                </div>
                <div className="yStats">
                    <h1>O-{countO}</h1>
                </div>
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    )
}

export default TicTacToe;