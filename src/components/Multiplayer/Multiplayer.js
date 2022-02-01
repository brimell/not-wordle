import React, { useRef } from "react";
import "firebase/compat/database";
import { supabase } from "../supabaseInit";
import { Input, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import "./Multiplayer.css";
import { useEffect } from "react";

async function insertRoom(username) {
  const { data, error } = await supabase
    .from("rooms")
    .insert([{ players: { username } }]);
}

async function updatePlayers(props) {
  const { data, error } = await supabase
    .from("rooms")
    .update({ name: "Middle Earth" })
    .match({ id: props.currentRoom });
}

export default function Multiplayer() {
  const nameRef = useRef("");
  const currentRoom = sessionStorage.getItem("currentRoom");

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
      <CustomTextField InputProps={{
        inputProps: {
            style: { textAlign: "center" },
        }
    }} inputRef={nameRef} className="input-div" label="Name" />
      <div className="form-container">
        <div className="create-game">
          <Button
            className="create-game-btn"
            variant="contained"
            onClick={() => {
              if (nameRef.length > 2) {
                insertRoom(nameRef);
              }
            }}
          >
            Create Game
          </Button>
        </div>
        <div className="join-game">
        <Button
            className="join-game-btn"
            variant="contained"
            onClick={() => {
              // need to implement joining
            }}
          >
            Create Game
          </Button>
        </div>
      </div>
    </div>
  );
}
