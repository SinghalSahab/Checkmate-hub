import React, { useEffect,useState } from 'react'
import ChessBoard from '../components/ChessBoard'
import Button from '../components/Button'
import useSocket from '../hooks/useSocket'
import {Chess} from 'chess.js'

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
const GamePage = () => {
    const socket = useSocket();
    const [board,setBoard] = useState();
    useEffect(()=>{
       if(!socket){
        return;
       } 
       socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        switch(message.type){
            
            case INIT_GAME:
                console.log("Game Initialized");
                break;
            case MOVE:
                console.log("Move Made");
                break;
            case GAME_OVER:
                console.log("Game Over");
                break;
            default:
                break;
        }
       }
    },[socket])
    if(!socket) return<div>Connecting...</div>
      return (
    <div className='justify-center bg-zinc-900 min-h-screen flex'>
       <div className='pt-8 w-full max-w-screen-lg'>
        <div className='grid grid-cols-6 gap-4 w-full'>
            <div className='cols-span-4 w-full bg-slate-400'>
                <ChessBoard />
            </div>
            <div className='cols-span-2 w-full '>
            <Button onClick={()=>{
                socket.send(JSON.stringify({
                    type: INIT_GAME
                }))
              }}>Play
                
            </Button>
            </div>
        </div>
       </div>
    </div>
  )
}

export default GamePage