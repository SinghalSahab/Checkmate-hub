import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message";
import { Game } from "./Game";


export class GameManager{
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users:WebSocket[];
    constructor()
    {
        this.users = [];
        this.games = [];
        this.pendingUser = null;
    }
    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(users => users!=socket);
        //stopin the game when the user left
    }

    private addHandler(socket:WebSocket){
        socket.on("message",(data) =>{
        const message = JSON.parse(data.toString());

        if(message.type === INIT_GAME)
        {
            console.log("init-game")
            //this.joinGame(socket);
            if(this.pendingUser)
            {
                const game = new Game(this.pendingUser,socket);
                this.games.push(game);
                this.pendingUser = null;
            }
            else{
                this.pendingUser = socket;
            }
        }
        if(message.type === MOVE){
            console.log("in move1")
            const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
            if(game){
                console.log("inside makemove")
                game.makeMove(socket,message.payload.move);
            }

        }
        })
    }

}