import React from "react";
import "./Multiplayer.css";
import { supabase } from "../supabaseInit";

window.onbeforeunload = closingCode;

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

export default function Lobby() {
  const currentRoom = sessionStorage.getItem("currentRoom");
  console.log(fetchRoom(currentRoom));
  return (
    <div>
      <h1>Lobby</h1>
      <h2
        style={{ fontSize: "1rem", marginTop: "-20px" }}
        className="loading-text"
      >
        Waiting for players
      </h2>
    </div>
  );
}
