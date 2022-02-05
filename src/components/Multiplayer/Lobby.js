import React, { useEffect, useState } from "react";
import "./Multiplayer.css";
import { TextField, Button } from "@mui/material";
import socket from "../socketio";
import GameParent from "../Game/GameParent";
import PlayerListItem from "./PlayerListItem.js";
import Podium from "./Podium";

function startGame(setGame) {
  socket.emit("start-game");
}

export default function Lobby(props) {
  const [users, setUsers] = useState([]);
  const [game, setGame] = useState(false);
  const [startHide, setStartHide] = useState(false);
  const [target, setTarget] = useState("");
  const [podium, setPodium] = useState(false);
  const [grids, setGrids] = useState([])
  const [winner, setWinner] = useState("test");

  useEffect(() => {
    socket.emit('fetchUserList')
  }, [])

  function gameLost(id) {
    console.log(id, " lost");
  }

  function gameWon(id) {
    console.log(id, " won");
    socket.emit("getUser", id);
    setGame(false);
    setPodium(true);
  }

  socket.on("game-started", (props) => {
    if (props.res) {
      setTarget(props.target);
      setGame(true);
    }
  });
  socket.on("getUserRes", (user) => {
    setWinner(user.name);
  });
  socket.on("gameWon", (id) => {
    gameWon(id);
  });
  socket.on("gameLost", (id) => {
    gameLost(id);
  });
  socket.on("update-grid-client", Grids => {
    console.log('update grid client: ', Grids)
    setGrids(Grids)
  });
  socket.on("updateUsersList", (userList) => {
    socket.emit("fetchFullUsersList");
    setUsers(userList);
  });
  socket.on("updateFullUsersList", (userList) => {
    setStartHide(
      userList.find((user) => user.id === socket.id).role === "host"
    );
  });

  return (
    <div className="container">
      {!game && !podium && (
        <div className="lobby back-row-toggle splat-toggle">
          <div className="rain front-row"></div>
          <div className="rain back-row"></div>
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
            {users.map((user, i) => {
              return <PlayerListItem user={user} key={i} />;
            })}
          </div>
          {startHide && (
            <Button
              className="start-game-btn"
              variant="contained"
              onClick={() => {
                startGame(setGame);
              }}
            >
              Start game
            </Button>
          )}
          <Button
            className="leave-room-btn"
            variant="contained"
            onClick={() => {
              socket.emit("leave-room");
              props.setLobby(false);
            }}
          >
            Leave
          </Button>
        </div>
      )}
      {game && <GameParent grids={grids} socket={socket} target={target} />}
      {podium && <Podium socket={socket} target={target} winner={winner} />}
    </div>
  );
}
