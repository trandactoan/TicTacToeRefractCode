import React from 'react'
import Square from '../square'
import "./board.css"

function Board({squares, onClick, boardSize, winnerCal}){
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        winnerCal={winnerCal}
        index={i}
        squares={squares}
        key={i}
      />
    );
  }
  const board=[];
  for(let i =0; i<boardSize; i++)
  {
    const boardRow=[];
    for(let j =0;j<boardSize;j++)
    {
      boardRow.push(renderSquare(i*boardSize+j));
    }
    board.push(
      <div className="board-row" key={i}>
          {boardRow}
      </div>
    )
  }
  return (
    <div>
      {board}
    </div>
  )
}

export default Board;