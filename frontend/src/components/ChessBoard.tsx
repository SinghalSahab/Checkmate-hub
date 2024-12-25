import { Color, PieceSymbol, Square } from 'chess.js';
import React, { useState } from 'react'

const ChessBoard = ({board,socket} :{
    board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket:WebSocket;
}) => {
    const [from,setFrom] = useState<null | Square>(null);
    const [to,setTo] = useState<null | Square>(null);
  return (
    <div className='text-black w-full'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='flex justify-center items-center'>
                    {row.map((square, squareIndex) => (
                        <div onClick={()=>{
                              if(!from){
                                setFrom(square?.square ?? null);
                              }
                              else{
                                setTo(square?.square ?? null);
                                socket.send(JSON.stringify({
                                    type:"move",
                                    payload:{
                                    from,
                                    to: square?.square
                                    }
                                }))
                              }
                        }} key={squareIndex} className={`p-2 w-16 h-16 ${(rowIndex + squareIndex)%2 == 0? 'bg-[#779556]' : 'bg-[#EBECD0]'}`}>
                            <div className='w-full justify-center flex h-full'>
                                <div className='h-full justify-center flex flex-col'>
                                {square? square.type : ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
    </div>
  )
}

export default ChessBoard