import { Color, PieceSymbol, Square } from 'chess.js';
import React from 'react'

const ChessBoard = ({board} :{
    board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]
}) => {
  return (
    <div className='text-white w-full'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='flex justify-center items-center gap-2'>
                    {row.map((square, squareIndex) => (//there could be error in css below
                        <div key={squareIndex} className={`p-2 w-8 h-8 ${square?.color}-500 ${square?.type}-400`}>
                            {square? square.type : ""}
                        </div>
                    ))}
                </div>
            ))}
    </div>
  )
}

export default ChessBoard