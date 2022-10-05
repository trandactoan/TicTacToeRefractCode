import React from "react";
import "./square.css"
function Square({value, onClick, index, squares, winnerCal}){
  const winner=winnerCal(squares, index);
  return (
    <button className="square" onClick={onClick} style={{backgroundColor: winner[0]? "green": ""}}>
      {value}
    </button>
  )
}
export default Square;