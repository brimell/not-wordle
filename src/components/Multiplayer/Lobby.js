import React, {useEffect} from "react";
import "./Multiplayer.css";
import { TextField, Button } from "@mui/material";
import socket from "../socketio";
import GameParent from '../Game/GameParent'

async function startGame(setGame) {
    console.log('start game')
    socket.emit('start-game')
    await socket.on('game-started', props => {
        setGame(true)
    })
    socket.on('update-grid-client', props => {
      
    })
}

export default function Lobby(props) {
  const [users, setUsers] = React.useState([]);
  const [game, setGame] = React.useState(false);

  useEffect(() => {
    socket.emit('fetchUserList')
    socket.on('user-list', (userList) => {
      setUsers(userList)
    })
  },[])

  console.log('player list: ',users)
  return (
    <div className="container">
      {!game &&
      <div className="lobby">
      <h2 className="lobby-title">
        Game Code: <span className="code-txt">{}</span>
      </h2>
      <h2
        style={{ fontSize: "1rem", marginTop: "-20px" }}
        className="loading-text"
      >
        Waiting for players
      </h2>
      <div className="player-list">
        {Object.values(users).map(function (key, index) {
          return (
            <div className="player-list-item" key={index}>
              {key.username}
            </div>
          );
        })}
      </div>
      <Button
        className="start-game-btn"
        variant="contained"
        onClick={() => {
          startGame(setGame);
        }}
      >
        Start game
      </Button>
      <Button
        className="start-game-btn"
        variant="contained"
        onClick={() => {
          socket.emit('leave-room')
          props.setLobby(false)
        }}
      >
        Leave
      </Button>
    </div>
    }
    {game &&
    <GameParent socket={socket}/>
    }
    </div>
    
    
  );
}
