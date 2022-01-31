import React from 'react'
import Game from './Game'
import Settings from './Settings'

export default function GameParent(props) {
    const settings = props.settings;
    const maxGuesses = props.maxGuesses;
    const seedUpdate = props.seedUpdate;
    return (
      <div className="GameContainer">
          {settings && (<Settings seedUpdate={seedUpdate}/>)}
          <Game maxGuesses={maxGuesses} hidden={settings} />
        </div>
    )   
  }