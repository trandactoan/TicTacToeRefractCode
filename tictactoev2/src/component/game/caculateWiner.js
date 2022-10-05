function indexToRowAndCol(boardSize, index)
{
  const row=Math.floor(index/boardSize);
  const col=index-row*boardSize;
  return [row,col];
}

function rowAndColToIndex(boardSize, row, col)
{
  return row*boardSize+col;
}

function checkWinningByVertical(squares, i){
  const boardSize=Math.sqrt(squares.length);
  const result=[];
  result.push(i);
  const rowAndCol=indexToRowAndCol(boardSize, i);
  const valueAtIndexI=squares[i];
  // to up
  let currentRowToUp=rowAndCol[0]-1;
  while(currentRowToUp>=0 && squares[rowAndColToIndex(boardSize,currentRowToUp,rowAndCol[1])] === valueAtIndexI)
  {
    result.push(rowAndColToIndex(boardSize,currentRowToUp,rowAndCol[1]));
    currentRowToUp-=1;
  }

  //to down
  let currentRowToDown=rowAndCol[0]+1;
  while(currentRowToDown<boardSize && squares[rowAndColToIndex(boardSize,currentRowToDown,rowAndCol[1])] === valueAtIndexI)
  {
    result.push(rowAndColToIndex(boardSize,currentRowToDown,rowAndCol[1]));
    currentRowToDown+=1;
  }

  if(result.length === 5)
  {
    return [valueAtIndexI,result];
  }
  return false;
}

function checkWinningByHorizontal(squares, i){
  const boardSize=Math.sqrt(squares.length);
  const result=[];
  result.push(i);
  const rowAndCol=indexToRowAndCol(boardSize, i);
  const valueAtIndexI=squares[i];
  // to left
  let currentColToLeft=rowAndCol[1]-1;
  while(currentColToLeft>=0 && squares[rowAndColToIndex(boardSize,rowAndCol[0],currentColToLeft)] === valueAtIndexI)
  {
    result.push(rowAndColToIndex(boardSize,rowAndCol[0],currentColToLeft));
    currentColToLeft-=1;
  }

  //to right
  let currentColToRight=rowAndCol[1]+1;
  while(currentColToRight<boardSize && squares[rowAndColToIndex(boardSize,rowAndCol[0],currentColToRight)] === valueAtIndexI)
  {
    result.push(rowAndColToIndex(boardSize,rowAndCol[0],currentColToRight));
    currentColToRight+=1;
  }

  if(result.length === 5)
  {
    return [valueAtIndexI,result];
  }
  return false;
}

function checkWinningByForwardSlash(squares, i){
  const boardSize=Math.sqrt(squares.length);
  const result=[];
  result.push(i);
  const rowAndCol=indexToRowAndCol(boardSize, i);
  const valueAtIndexI=squares[i];

  // to bottom left
  let currentRowToDown=rowAndCol[0]+1;
  let currentColToLeft=rowAndCol[1]-1;
  while(currentRowToDown<boardSize
    && currentColToLeft>=0 
    && squares[rowAndColToIndex(boardSize,currentRowToDown,currentColToLeft)] === valueAtIndexI)
  {
    result.push(rowAndColToIndex(boardSize,currentRowToDown,currentColToLeft));
    currentRowToDown+=1;
    currentColToLeft-=1;
  }

  //to top right
  let currentRowToUp=rowAndCol[0]-1;
  let currentColToRight=rowAndCol[1]+1;
  while(currentRowToUp>=0 
    && currentColToRight<boardSize 
    && squares[rowAndColToIndex(boardSize,currentRowToUp,currentColToRight)] === valueAtIndexI)
  {
    result.push(rowAndColToIndex(boardSize,currentRowToUp,currentColToRight));
    currentRowToUp-=1;
    currentColToRight+=1;
  }

  if(result.length === 5)
  {
    return [valueAtIndexI,result];
  }
  return false;
}

function checkWinningByBackSlash(squares, i){
  const valueAtIndexI=squares[i];
  const boardSize=Math.sqrt(squares.length);
  const result=[];
  result.push(i);
  const rowAndCol=indexToRowAndCol(boardSize, i);

  // to bottom right
  let currentRowToDown=rowAndCol[0]+1;
  let currentColToRight=rowAndCol[1]+1;
  while(currentRowToDown<boardSize
    && currentColToRight<boardSize
    && squares[rowAndColToIndex(boardSize,currentRowToDown,currentColToRight)] === valueAtIndexI)
  {
    result.push(rowAndColToIndex(boardSize,currentRowToDown,currentColToRight));
    currentRowToDown+=1;
    currentColToRight+=1;
  }

  //to top left
  let currentRowToUp=rowAndCol[0]-1;
  let currentColToLeft=rowAndCol[1]-1;
  while(currentRowToUp>=0 
    && currentColToLeft>=0 
    && squares[rowAndColToIndex(boardSize,currentRowToUp,currentColToLeft)] === valueAtIndexI)
  {
    result.push(rowAndColToIndex(boardSize,currentRowToUp,currentColToLeft));
    currentRowToUp-=1;
    currentColToLeft-=1;
  }

  if(result.length === 5)
  {
    return [valueAtIndexI,result];
  }
  return false;
}

function CalculateWinner(squares, i) {
  if(i<0 || squares[i]===null) return false;
  const verticalResult=checkWinningByVertical(squares,i);
  const horizontalResult=checkWinningByHorizontal(squares,i);
  const forwardSlashResult=checkWinningByForwardSlash(squares,i);
  const backSlashResult=checkWinningByBackSlash(squares,i);
  if(verticalResult[0])
  {
    return verticalResult;
  }
  else if(horizontalResult[0])
  {
    return horizontalResult;
  }
  else if(forwardSlashResult[0])
  {
    return forwardSlashResult;
  }
  else if(backSlashResult[0])
  {
    return backSlashResult;
  }
  return false;
}

export default CalculateWinner