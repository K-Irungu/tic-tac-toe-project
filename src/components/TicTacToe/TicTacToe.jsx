import React, { useState } from 'react'
import './TicTacToe.css'
import circle from '../Assets/circle.png'
import cross from '../Assets/cross.png'

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {

    let [count, setCount] = useState(1);
    let [lock, setLock] = useState(false);
    let [message, setMessage] = useState();

    const toggle = (e, index)=> {

        if(lock) { 
            return 0;
        };
        if(count%2===0 && data[index] === ""){
            e.target.innerHTML = `<img src='${cross}'/>`;
            data[index] = "x";
            setCount(++count);
        }
        if(count%2!==0 && data[index] === ""){
            e.target.innerHTML = `<img src='${circle}'/>`;
            data[index] = "o";
            setCount(++count);     
        }
        checkWin();
    }

    const checkWin = () => {
        if(data[0] === data[1] && data[1] === data[2] && data[2] !== ''){ 
            won(data[2]) 
        }
        else if(data[3] === data[4] && data[4] === data[5] && data[5] !== ''){
            won(data[5])
        }
        else if(data[6] === data[7] && data[7] === data[8] && data[8] !== ''){
            won(data[8])
        }
        else if(data[0] === data[4] && data[4] === data[8] && data[8] !== ''){
            won(data[8])
        }
        else if(data[6] === data[4] && data[4] === data[2] && data[2] !== ''){
            won(data[2])
        }
        else if(data[0] === data[3] && data[3] === data[6] && data[6] !== ''){
            won(data[6])
        }
        else if(data[1] === data[4] && data[4] === data[7] && data[7] !== ''){
            won(data[7])
        }
        else if(data[2] === data[5] && data[5] === data[8] && data[8] !== ''){
            won(data[8])
        }
    }

    const won = (winner) => { 
        setLock(true);
        winner === "x" ? 
        setMessage(<h1 className='title'>Congratulations: <img src={cross} className='winnerLogo' alt='cross' /> won!</h1>):
        setMessage(<h1 className='title'>Congratulations: <img src={circle} className='winnerLogo' alt='circle'/> won!</h1>)
    }


    const reset = () => {
        setLock(false);
        setMessage(null);
        data = ["", "", "", "", "", "", "", "", ""];
        document.querySelectorAll(".box").forEach((element) => element.innerHTML='')
    }

  return (
    <div className='container'>
        {   message? 
            message: 
            <h1 className='title'>Tic Tac Toe Game <span>React</span></h1> 
        }
        <div className="board">
            <div className="column1">
                <div className="box" onClick={(e) => { toggle(e, 0) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 1) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 2) }}></div>
            </div>
            <div className="column2">
                <div className="box" onClick={(e) => { toggle(e, 3) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 4) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 5) }}></div>
            </div>
            <div className="column3">
                <div className="box" onClick={(e) => { toggle(e, 6) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 7) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 8) }}></div>
            </div>
        </div>
        <button className="reset" onClick={reset}>Reset</button>
    </div>
  )
}

export default TicTacToe