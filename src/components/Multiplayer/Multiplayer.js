import React, { useRef } from "react";
import "firebase/compat/database";
import { supabase } from "../supabaseInit";
import { Input, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import "./Multiplayer.css";
import { useEffect } from "react";

async function fetchRoom(currentRoom) {
  const { data, error } = await supabase
  .from('rooms')
  .select('*')
  return data
}

async function joinGame(code, players, name) {
  sessionStorage.setItem('code', code);
  sessionStorage.setItem('name', name);
  players[name] = [];
  const { data, error } = await supabase
    .from("rooms")
    .update({ players: players })
    .match({ code: code });
  window.location.href = "/not-wordle/lobby";
}

async function insertRoom(username, code) {
  const players = {}
  players[username] = [];

  const { data, error } = await supabase
    .from("rooms")
    .insert([{ players: players, code: code }]);
}

const mySubscription = supabase
  .from('rooms')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()

async function createGame(name, code) {
  sessionStorage.setItem('code', code);
  sessionStorage.setItem('name', name);
  await insertRoom(name,code);
  window.location.href = "/not-wordle/lobby";
}

export default function Multiplayer() {
  const nameRef = useRef("");
  const codeRef = useRef("");

  const CustomTextField = styled(TextField)({
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  });

  return (
    <div className="multiplayer">
      <CustomTextField inputRef={nameRef} className="input-div" label="Name" />
      <CustomTextField inputRef={codeRef} className="input-div" label="Code" />
      <div className="form-container">
        <div className="join-game">
          <Button
            className="join-game-btn"
            variant="contained"
            onClick={() => {
              fetchRoom(codeRef.current.value).then(data => {
                for (let i = 0; i < data.length; i++) {
                  if (data[i].code === codeRef.current.value) {
                    // console.log(data[i])
                    joinGame(data[i].code, data[i].players, nameRef.current.value);
                    break
                  }
                }
              })
            }}
          >
            Join Game
          </Button>
        </div>
        <div className="create-game">
          <Button
            className="create-game-btn"
            variant="contained"
            onClick={() => {
              if (nameRef.current.value.length > 2 && codeRef.current.value.length > 2) {
                createGame(nameRef.current.value, codeRef.current.value);
              } else {
                alert("name and code must be at least 3 characters");
              }
            }}
          >
            Create Game
          </Button>
        </div>
      </div>
    </div>
  );
}
