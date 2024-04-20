import React, { useState } from 'react'
import './TicTacToe.css'
import circle from '../Assets/circle.png'
import cross from '../Assets/cross.png'
import Strike from '../Strike/Strike'

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {

    let [count, setCount] = useState(1);
    let [lock, setLock] = useState(false);
    let [message, setMessage] = useState();
    let [countX, setCountX] = useState(0);
    let [countO, setCountO] = useState(0);
    let [strikethrough, setStrikethrough] = useState('')

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

    // const clearBoard = () =>{

    // }

    const checkWin = () => {

        if(data[0] === data[1] && data[1] === data[2] && data[2] !== ''){ 
            won(data[2]);
            setStrikethrough('strike-column-1')

        }
        else if(data[3] === data[4] && data[4] === data[5] && data[5] !== ''){
            won(data[5]);
            setStrikethrough('strike-column-2')
        }
        else if(data[6] === data[7] && data[7] === data[8] && data[8] !== ''){
            won(data[8]);
            setStrikethrough('strike-column-3')
        }
        else if(data[0] === data[4] && data[4] === data[8] && data[8] !== ''){
            won(data[8]);
            setStrikethrough('strike-diagonal-1');
        }
        else if(data[6] === data[4] && data[4] === data[2] && data[2] !== ''){
            won(data[2]);
            setStrikethrough('strike-diagonal-2');
        }
        else if(data[0] === data[3] && data[3] === data[6] && data[6] !== ''){
            won(data[6]);
            setStrikethrough('strike-row-1');

        }
        else if(data[1] === data[4] && data[4] === data[7] && data[7] !== ''){
            won(data[7]);
            setStrikethrough('strike-row-2');
        }
        else if(data[2] === data[5] && data[5] === data[8] && data[8] !== ''){
            won(data[8]);
            setStrikethrough('strike-row-3');
        } else if(!data.includes("")){
            won(null)
        }
    }

    const won = (winner) => { 
        setLock(true);

        if(winner === "x"){
            setMessage(<h1 className='title'>Congratulations: <img src={cross} className='winnerLogo' alt='cross' /> won!</h1>);
            setCountX(countX+1);
        } else if(winner === "o"){
            setMessage(<h1 className='title'>Congratulations: <img src={circle} className='winnerLogo' alt='circle'/> won!</h1>);
            setCountO(countO+1);
        } else if(!winner){
            setMessage(<h1 className='title'>Draw!</h1>)
        }

        setTimeout(() =>{
            setStrikethrough('');
            setLock(false);
            setMessage(null);
            data = ["", "", "", "", "", "", "", "", ""];
            document.querySelectorAll(".box").forEach((element) => element.innerHTML='');
        } ,


            2500
        );
    }

    const reset = () => {
        setStrikethrough('');
        setLock(false);
        setMessage(null);
        data = ["", "", "", "", "", "", "", "", ""];
        document.querySelectorAll(".box").forEach((element) => element.innerHTML='');
        setCountO(0);
        setCountX(0);
    }

  return (
    <div className='container'>

        {   message? 
            message :
            <h1 className='title'>Tic Tac Toe Game <span>React</span></h1>
        }
        
        <div className="board">
        {strikethrough==="strike-row-1" ||
            strikethrough==="strike-row-2" ||
            strikethrough==="strike-row-3" ||
            strikethrough==="strike-diagonal-1" ||
            strikethrough==="strike-diagonal-2"?
            <Strike strikethrough={strikethrough} />: 
            <></>
        }
            <div className="column1">
                <div className="box" onClick={(e) => { toggle(e, 0) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 1) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 2) }}></div>
                {strikethrough==="strike-column-1"? <Strike strikethrough={strikethrough} />: <></>}
            </div>
            <div className="column2">
                <div className="box" onClick={(e) => { toggle(e, 3) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 4) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 5) }}></div>
                {strikethrough==="strike-column-2"? <Strike strikethrough={strikethrough} />: <></>}
            </div>
            <div className="column3">
                <div className="box" onClick={(e) => { toggle(e, 6) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 7) }}></div>
                <div className="box" onClick={(e) => { toggle(e, 8) }}></div>
                {strikethrough==="strike-column-3"? <Strike strikethrough={strikethrough} />: <></>}
            </div>
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