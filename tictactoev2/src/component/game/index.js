import React, { useState } from 'react'
import Board from '../board'
import "./game.css";
import CalculateWinner from './caculateWiner';

function indexToRowAndCol(boardSize, index)
{
  const row=Math.floor(index/boardSize);
  const col=index-row*boardSize;
  return [row,col];
}

function Game({ boardSize }) {
  const [history, setHistory] = useState([
    {
      squares: Array(boardSize * boardSize).fill(null),
      currentStep: -1,
    },
  ])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const [isAscending, setIsAscending]=useState(true);

  function handleClick(i) {
    const latestHistory=history.slice(0,stepNumber+1);
    const current=latestHistory[latestHistory.length-1];
    const squares=current.squares.slice();
    const lastStep=history[history.length-1].currentStep;
    if (CalculateWinner(squares, lastStep) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(
      latestHistory.concat([
        {
          squares: squares,
          currentStep: i,
        },
      ])
    )
    setStepNumber(latestHistory.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const current = history[stepNumber]
  const lastStep=history[history.length-1].currentStep;
  const winner = CalculateWinner(current.squares, lastStep);

  const moves = history.map((step, move, historyData) => {
    const currentMove= isAscending?move:(historyData.length-move)
    let rowAndCol=[];
    if(move)
    {
      rowAndCol=indexToRowAndCol(boardSize,historyData[currentMove].currentStep);
    }
    const desc = move ?
      'Go to move #' + currentMove + " row: " + rowAndCol[0].toString() + " col: " + rowAndCol[1].toString()
      :
      'Go to game start';
    return (
      <li key={currentMove}>
        <button 
          onClick={() => jumpTo(currentMove)}
          style={{ fontWeight: currentMove === stepNumber ? 'bold' : '' }}
        >{desc}</button>
      </li>
    );
  })

  let status
  if (winner[0]) {
    status = 'Winner: ' + winner[0]
  } else if(stepNumber === boardSize*boardSize)
  {
    status = 'Draw'
  }
   else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
          boardSize={boardSize}
          winnerCal={CalculateWinner}
        />
      </div>
      <div className="game-info">
        <div>
          <button onClick={()=> setIsAscending(!isAscending)}>
            Change move sort to {isAscending?"descending":"ascending"}
          </button>
        </div>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
export default Game