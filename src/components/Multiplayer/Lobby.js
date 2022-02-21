import React, { useEffect, useState, useRef } from "react";
import "./Multiplayer.css";
import { Button } from "@mui/material";
import socket from "../socketio";
import GameParent from "../Game/GameParent";
import PlayerListItem from "./PlayerListItem.js";
import Podium from "./Podium/Podium";
import { useModal } from "react-hooks-use-modal";
import GridViewModal from "../Modals/GridViewModal";
import $ from "jquery";

function startGame(setGame) {
  socket.emit("start-game");
}

export default function Lobby(props) {
  const [users, setUsers] = useState([]);
  const [game, setGame] = useState(false);
  const [startHide, setStartHide] = useState(false);
  const [target, setTarget] = useState("");
  const [podium, setPodium] = useState(false);
  const [grids, setGrids] = useState({});
  const [winner, setWinner] = useState(false);
  const [username, setUsername] = useState("");
  const [lobby, setLobby] = useState(true);
  const [gridViewModal, gridViewOpen, gridViewClose, gridViewIsOpen] = useModal(
    "root",
    {
      preventScroll: true,
    }
  );

  useEffect(() => {
    socket.emit("fetchUserList");
    socket.emit("getUser", socket.id);
  }, []);

  function gameLost(id) {
    console.log(id, " lost");
  }

  useEffect(() => {
    console.log("winner: ", winner);
  }, [winner]);

  function gameWon(id) {
    if (game === true || podium === false) {
      console.log(id, " won");
      setGame(false);
      socket.emit("getUser", id);
      setPodium(true);
      setLobby(true); // for next game
    }
  }

  socket.on("game-started", (props) => {
    if (props.res) {
      setTarget(props.target);
      setGame(true);
      setLobby(false);
    }
  });
  socket.on("getUserRes", (user) => {
    if (game === false && lobby === false) {
      setWinner(user.name);
    }
    setUsername(user.name);
  });
  socket.on("gameWon", (id) => {
    gameWon(id);
  });
  socket.on("gameLost", (id) => {
    gameLost(id);
  });
  socket.on("update-grid-client", (Grids) => {
    // console.log("got grids", Grids);
    setGrids(Grids);
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
      {game && <GameParent socket={socket} target={target} />}
      {(game || podium) && $(window).width() >= 1100 && (
        <div className="gridBar">
          {grids &&
            Object.keys(grids).map((name, i) => {
              if (name === username) {
                return "";
              } else {
                return (
                  <div className="gridItem" key={i}>
                    <span className="nameTitle">{name}</span>
                    {grids[name].map((row, j) => {
                      return (
                        <div className="gridRow" key={j}>
                          {row.map((letter, k) => {
                            return (
                              <div
                                className={`gridLetter letter-clue-${letter.clue}`}
                                key={k}
                              >
                                {podium && letter.letter}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })}
        </div>
      )}
      {(game || podium) && $(window).width() < 1100 && (
        <GridViewModal
          close={gridViewClose}
          modal={gridViewModal}
          game={game}
          podium={podium}
          grids={grids}
          username={username}
          isOpen={gridViewIsOpen}
        />
      )}

      {podium && (
        <Podium grids={grids} socket={socket} target={target} winner={winner} />
      )}
    </div>
  );
}
