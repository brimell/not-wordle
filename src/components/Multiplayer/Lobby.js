import React from 'react'
import './Multiplayer.css'

window.onbeforeunload = closingCode;
function closingCode(){
   // remove room if you are the only one in it
   return null;
}

export default function Lobby() {
    return (
        <div>
        <h1>Lobby</h1>
        <h2 style={{fontSize: "1rem", marginTop: "-20px"}} className="loading-text">Waiting for players</h2>
        </div>
    )
}