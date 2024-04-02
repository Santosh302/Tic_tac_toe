import Card from "../Card/Card";
import {useCallback, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import isWinner from '../helpers/checkWinner';

import './Grid.css'
import 'react-toastify/dist/ReactToastify.css';

function Grid({numberOfCards}){

    const [turn, setTurn]= useState(true); //false -> X, and true ->0
    const [board, setBoard] =useState(Array(numberOfCards).fill(""));
    const [winner, setWinner]=useState(null);
    
    const play= useCallback(function playCallback(index){
        if(turn == true){
            board[index]="0";
        }
        else{
            board[index]="X";
        }
        const win= isWinner(board, turn? "0":"X")
        if(win){
            setWinner(win);
            toast.success(`congratulation ${win} Won the game `)
        }
        setBoard([...board]);
        setTurn(!turn);
    },[turn]);
    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true);
    }
    return (
        <div className="grid-wrapper">
            {winner && (
                <>
                <h1 className="turn-highlight">Winner is {winner}</h1>
                <button onClick={reset} className="reset">Reset Game</button>
                <ToastContainer position="top-center"/>
                </>
            )}
            <h1 className="turn-highlight">Current Turn : {(turn) ? '0':'X'}</h1>
            <div className="grid">
                {board.map((value,idx)=>{
                    return <Card  gameEnd={winner? true: false} onPlay={play} player={value} key={idx} index={idx} />
                })}
            </div>
        </div>
    )
}
export default Grid;