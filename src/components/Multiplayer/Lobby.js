import React, {useEffect} from "react";
import "./Multiplayer.css";
import { TextField, Button } from "@mui/material";
import socket from "../socketio";
import GameParent from '../Game/GameParent'
import PlayerListItem from './PlayerListItem.js'

function startGame(setGame) {
    socket.emit('start-game')
    socket.on('game-started', (res) => {
      if (res) {
        setGame(true)
      }
    })
    socket.on('update-grid-client', props => {
      // stuff
    })
}

export default function Lobby(props) {
  const [users, setUsers] = React.useState([]);
  const [game, setGame] = React.useState(false);
  const [startHide, setStartHide] = React.useState(false);

  socket.on('updateUsersList', (userList) => {
    socket.emit('fetchFullUsersList')
    setUsers(userList)
  })
  socket.on('updateFullUsersList', (userList) => {
    setStartHide(userList.find(user => user.id === socket.id).role === 'host')
  })
  
  return (
    <div className="container">
      {!game &&
      <div className="lobby">
      <h2 className="lobby-title">
        Game Code: <span className="code-txt">{props.room}</span>
      </h2>
      <h2
        style={{ fontSize: "1rem", marginTop: "-20px" }}
        className="loading-text"
      >
        Waiting for players
      </h2>
      <div className="player-list">
        {users.map(function (user,i) {
          return (
            <PlayerListItem user={user} key={i}/>
          );
        })}
      </div>
      {startHide && <Button
        className="start-game-btn"
        variant="contained"
        onClick={() => {
          startGame(setGame);
        }}
      >
        Start game
      </Button>}
      <Button
        className="leave-room-btn"
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
