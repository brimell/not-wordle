import React from "react";
import Game from "./Game";
import Settings from "./Settings";
import { useEffect } from "react";
import {supabase} from './supabaseInit'
import { ConstructionOutlined } from "@mui/icons-material";
import Multiplayer from './Multiplayer/Multiplayer';

async function fetchPlayers(currentRoom) {
  const { data, error } = await supabase
  .from('rooms')
  .select({id: currentRoom })
  return data
}

async function updatePlayers(currentRoom, players) {
  const { data, error } = await supabase
  .from('rooms')
  .update({ players: players })
  .match({ id: currentRoom })
}

var multiplayer = Boolean(sessionStorage.getItem('multiplayer'))

export default function GameParent(props) {
  const settings = props.settings;
  const maxGuesses = props.maxGuesses;
  const seedUpdate = props.seedUpdate;
  const username = props.username || null
  const currentRoom = props.currentRoom || null
  const [currentGrid, setCurrentGrid] = React.useState([]);

  useEffect(() => {

    // console.log('settings: '+settings)
    console.log(currentGrid)
    if (multiplayer) {
      console.log(fetchPlayers(currentRoom))
      updatePlayers(currentRoom, fetchPlayers(currentRoom))
    } 
    
  }, [currentGrid, currentRoom, settings])

  return (
    <div className="GameContainer">
      {settings && <Settings seedUpdate={seedUpdate} />}
      <Game maxGuesses={maxGuesses} hidden={settings} setCurrentGrid={setCurrentGrid} />
    </div>
  );
}
