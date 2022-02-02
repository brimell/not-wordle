import React from "react";
import Game from "./Game";
import Settings from "../Modals/Settings";
import { useEffect } from "react";

export default function GameParent(props) {
  const socket = props.socket || null
  const settings = props.settings;
  const maxGuesses = props.maxGuesses;
  const seedUpdate = props.seedUpdate;
  const username = props.username || null
  const currentRoom = props.currentRoom || null
  const [currentGrid, setCurrentGrid] = React.useState([]);

  useEffect(() => {
    socket.emit('update-grid', {grid : currentGrid})
  })

  return (
    <div className="GameContainer">
      {settings && <Settings seedUpdate={seedUpdate} />}
      <Game maxGuesses={maxGuesses} hidden={settings} setCurrentGrid={setCurrentGrid} />
    </div>
  );
}
