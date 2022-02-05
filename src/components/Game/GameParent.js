import React, {useState} from "react";
import Game from "./Game";
import Settings from "../Modals/Settings";
import { useEffect } from "react";

export default function GameParent(props) {
  const socket = props.socket || null;
  const settings = props.settings;
  const maxGuesses = 6;
  const seedUpdate = props.seedUpdate;
  const username = props.username || null;
  const currentRoom = props.currentRoom || null;
  const [currentGrid, setCurrentGrid] = useState([]);
  const [multiplayerGrid, setMultiplayerGrid] = useState([])
  const target = props.target || false;
  const grids = props.grids;

  useEffect(() => {
    console.log(grids)
  },[grids])

  useEffect(() => {
    console.log('curr grid: ',multiplayerGrid)
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
        {/* {grids && Object.keys(grids).map((key, i) => {
          return (
            <div className="gridItem" key={i}>
              <span className="nameTitle">{key}</span>
              {grids[key].map((row, j) => {
                return (
                  <div className="gridRow" key={j}>
                    {row.map((letter, k) => {
                      return (
                        <div className="gridLetter" key={k}>
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
