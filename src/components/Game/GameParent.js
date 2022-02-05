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
  const currentRoom = props.currentRoom || null;
  const [currentGrid, setCurrentGrid] = useState([]);
  const [multiplayerGrid, setMultiplayerGrid] = useState([]);
  const target = props.target || false;
  const grids = props.grids;

  useEffect(() => {
    console.log(grids);
  }, [grids]);

  useEffect(() => {
    if (socket) {
      socket.emit("update-grid", { grid: multiplayerGrid });
    }
  }, [multiplayerGrid]);

  function handleGameFinish(gameState) {
    socket.emit("gameFinish", gameState);
  }

  return (
    <div className="GameContainer">
      {settings && <Settings seedUpdate={seedUpdate} />}
      <Game
        setMultiplayerGrid={setMultiplayerGrid}
        target={target}
        maxGuesses={maxGuesses}
        hidden={settings}
        setCurrentGrid={setCurrentGrid}
        handleGameFinish={handleGameFinish}
      />
      <div className="gridBar">
        {grids &&
          Object.keys(grids).map((name, i) => {
            if (name === localStorage.getItem("name")) {
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
                            ></div>
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
    </div>
  );
}
