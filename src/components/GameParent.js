import React from "react";
import Game from "./Game";
import Settings from "./Settings";
import { useEffect } from "react";


export default function GameParent(props) {
  const settings = props.settings;
  const maxGuesses = props.maxGuesses;
  const seedUpdate = props.seedUpdate;

  useEffect(() => {
    console.log(settings)
  }, [settings])

  return (
    <div className="GameContainer">
      {settings && <Settings seedUpdate={seedUpdate} />}
      <Game maxGuesses={maxGuesses} hidden={settings} />
    </div>
  );
}
