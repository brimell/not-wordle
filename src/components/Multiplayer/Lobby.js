import React from "react";
import "./Multiplayer.css";
import { supabase } from "../supabaseInit";
import { Input, TextField, Button } from "@mui/material";

// window.onbeforeunload = closingCode;
window.removeEventListener("beforeunload", closingCode);
window.addEventListener('beforeunload', closingCode)
async function deleteRoom(code) {
  const { data, error } = await supabase
    .from("rooms")
    .delete()
    .match({ code: code });
}

async function updatePlayers(code, players) {
  const { data, error } = await supabase
    .from("rooms")
    .update({ players: players })
    .match({ code: code });
}

async function closingCode() {
  console.log('testsets')
  var code = sessionStorage.getItem("code");
  var players = {};
  const name = sessionStorage.getItem("name");
  await fetchRoom(sessionStorage.getItem("code")).then((data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].code === code) {
        if (data[i].players.length === 1) {
          deleteRoom(code);
        } else {
          players = data[i].players.name;
          delete players[name];
          updatePlayers(code, players);
        }
      }
    }
  });
  return null;
}

async function fetchRoom(currentRoom) {
  const { data, error } = await supabase.from("rooms").select("*");
  return data;
}

function startGame() {
    console.log('test')
}

export default function Lobby() {
  const code = sessionStorage.getItem("code");
  const [playerList, setPlayerList] = React.useState({});
  fetchRoom(code).then((data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].code === code) {
        setPlayerList(data[i].players);
      }
    }
  });

  return (
    <div className="lobby">
      <h2 className="lobby-title">
        Game Code: <span className="code-txt">{code}</span>
      </h2>
      <h2
        style={{ fontSize: "1rem", marginTop: "-20px" }}
        className="loading-text"
      >
        Waiting for players
      </h2>
      <div className="player-list">
        {Object.keys(playerList).map(function (key, index) {
          return (
            <div className="player-list-item" key={index}>
              {key}
            </div>
          );
        })}
      </div>
      <Button
        className="start-game-btn"
        variant="contained"
        onClick={() => {
          startGame();
        }}
      >
        Start game
      </Button>
    </div>
  );
}
