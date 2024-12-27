import { Color, PieceSymbol, Square } from 'chess.js';
import React, { useState } from 'react'

const ChessBoard = ({chess,setBoard,board,socket} :{
    chess:any;
    setBoard:any;
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
                    {row.map((square, squareIndex) => {

                    const squareRepresentation = String.fromCharCode(97 + (squareIndex % 8)) + "" + (8-rowIndex) as Square;
                        return <div onClick={()=>{
                              if(!from){
                                setFrom(squareRepresentation);
                              }
                              else{
                                socket.send(JSON.stringify({
                                    type:"move",
                                    payload:{
                                    move: {
                                        from,
                                    to : squareRepresentation
                                    }
                                    }
                                }))
                                setFrom(null);
                                chess.move({
                                    from,
                                    to : squareRepresentation
                                });
                                setBoard(chess.board());
                              }
                        }} key={squareIndex} className={`p-2 w-16 h-16 ${(rowIndex + squareIndex)%2 == 0? 'bg-[#779556]' : 'bg-[#EBECD0]'}`}>
                            <div className='w-full justify-center flex h-full'>
                                <div className='h-full justify-center flex flex-col'>
                                {square? square.type : ""}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            ))}
    </div>
  )
}

export default ChessBoard