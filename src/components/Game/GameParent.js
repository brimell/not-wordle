/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Game from "./Game";
import Settings from "../Modals/Settings";
import { useEffect } from "react";
import "./gridBar.css";

export default function GameParent(props) {
  const socket = props.socket || null;
  const settings = props.settings;
  const maxGuesses = 6;
  const seedUpdate = props.seedUpdate;
  const [currentGrid, setCurrentGrid] = useState([]);
  const [multiplayerGrid, setMultiplayerGrid] = useState([]);
  const target = props.target || false;

  useEffect(() => {
    if (socket && multiplayerGrid.length !== 0) {
      socket.emit("update-grid", multiplayerGrid);
    }
  }, [multiplayerGrid]);

  function handleGameFinish(gameState) {
    socket.emit("gameFinish", gameState);
  }

  return (
    <div className="GameContainer">
      {settings && <Settings seedUpdate={seedUpdate} />}
      <Game
        socket={socket}
        setMultiplayerGrid={setMultiplayerGrid}
        multiplayerGrid={multiplayerGrid}
        target={target}
        maxGuesses={maxGuesses}
        hidden={settings}
        setCurrentGrid={setCurrentGrid}
        handleGameFinish={handleGameFinish}
      />
    </div>
  );
}
