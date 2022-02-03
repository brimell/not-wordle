import React, {useEffect} from "react";
import "./Multiplayer.css";
import { TextField, Button } from "@mui/material";
import socket from "../socketio";
import GameParent from '../Game/GameParent'
import PlayerListItem from './PlayerListItem.js'
import Podium from './Podium'

function startGame(setGame) {
    socket.emit('start-game')
}

export default function Lobby(props) {
  const [users, setUsers] = React.useState([]);
  const [game, setGame] = React.useState(false);
  const [startHide, setStartHide] = React.useState(false);
  const [target, setTarget] = React.useState('');
  const [podium, setPodium] = React.useState(false)
  var winner = false

  function gameLost(id) {
    console.log(id,' lost')
  }

  function gameWon(id) {
    console.log(id, ' won')
    winner = id
    setGame(false)
    setPodium(true)
  }

  socket.on('game-started', (res,target) => {
    if (res) {
      setGame(true)
    }
    setTarget(target)
  })
  socket.on('gameWon', (id) => {
    gameWon(id)
  })
  socket.on('gameLost', (id) => {
    gameLost(id)
  })
  socket.on('update-grid-client', props => {
    // stuff
  })
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
    <GameParent socket={socket} target={target} />
    }
    {podium &&
    <Podium socket={socket} target={target} winner={winner} />
    }
    </div>
    
    
  );
}
