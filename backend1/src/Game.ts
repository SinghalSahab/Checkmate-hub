import { WebSocket } from "ws";
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME } from "./message";

export class Game{
   public player1: WebSocket;
   public player2: WebSocket;
   private board:Chess;
   private startDate: Date;
   private moveCount = 0;

   constructor(player1:WebSocket,player2:WebSocket){
   this.player1 = player1;
   this.player2 = player2;
   this.board = new Chess();
   this.startDate = new Date();
   this.player1.send(JSON.stringify({

      type: INIT_GAME,
      payload: {
         color:"white"
      }}))
      this.player2.send(JSON.stringify({

         type: INIT_GAME,
         payload: {
            color:"black"
         }}))
   }

    makeMove(socket:WebSocket,move:{
      from:string,
      to:string
     })
    {
      console.log("in move");
      //validation here
      if(this.moveCount % 2 == 0 && socket != this.player1){
         console.log("r1");
         return;

      }
      if(this.moveCount % 2 == 1 && socket != this.player2){
         console.log("r2");
         return;
      }
      console.log("did not a")
         
      // is the move valid

     try {
      this.board.move(move);
      
     } catch (error) {
      console.log(error);
      return;
     }
     console.log("move successeded")
       //check if the game is over
     if(this.board.isGameOver()){
      this.player1.emit(JSON.stringify({type:GAME_OVER,
         payload:{
            winner: this.board.turn() === "w"?"black":"white"
         }
      }));
      this.player2.emit(JSON.stringify({type:GAME_OVER,
         payload:{
            winner: this.board.turn() === "w"?"black":"white"
         }
      }));
      return;
     }


     

      //broadcast the game state to both player
      if(this.moveCount %2 === 0) {
         console.log("Sent1");
         this.player2.send(JSON.stringify({type:"move", payload:move}));
      } else {
         console.log("Sent1");
    this.player1.send(JSON.stringify({type:"move", payload:move}));
}
this.moveCount++;
    }
   }


