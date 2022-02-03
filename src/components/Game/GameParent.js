import React from "react";
import Game from "./Game";
import Settings from "../Modals/Settings";
import { useEffect } from "react";

export default function GameParent(props) {
  const socket = props.socket || null
  const settings = props.settings;
  const maxGuesses = 6
  const seedUpdate = props.seedUpdate;
  const username = props.username || null
  const currentRoom = props.currentRoom || null
  const [currentGrid, setCurrentGrid] = React.useState([]);
  const target = props.target || false

  useEffect(() => {
    if (socket) {
    socket.emit('update-grid', {grid : currentGrid})
    }
    console.log('gameparent target: ',props.target)
  }, [currentGrid])
  
  function handleGameFinish(gameState) {
    socket.emit('gameFinish', gameState)
  }

  return (
    <div className="GameContainer">
      {settings && <Settings seedUpdate={seedUpdate} />}
      <Game target={target} maxGuesses={maxGuesses} hidden={settings} setCurrentGrid={setCurrentGrid} handleGameFinish={handleGameFinish} />
    </div>
  );
}
