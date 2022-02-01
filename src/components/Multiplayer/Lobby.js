import React from 'react'
import './Multiplayer.css'
import { supabase } from "../supabaseInit";
import { Code } from '@mui/icons-material';

window.onbeforeunload = closingCode;
function closingCode(){
   // remove room if you are the only one in it
   return null;
}

async function fetchRoom(currentRoom) {
    const { data, error } = await supabase
    .from('rooms')
    .select('*')
    return data
  }

export default function Lobby() {
    const currentRoom = sessionStorage.getItem("currentRoom");
    console.log(fetchRoom(currentRoom))
    return (
        <div>
        <h1>Lobby</h1>
        <h2 style={{fontSize: "1rem", marginTop: "-20px"}} className="loading-text">Waiting for players</h2>
        </div>
    )
}