import React, { useRef } from "react";
import "firebase/compat/database";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import "./Multiplayer.css";
import io from "socket.io-client";

// const socket = io('https://rimell.cc/bill:3000')
const socket = io('http://localhost:3001')

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
              if (nameRef.current.value.length > 2 && codeRef.current.value.length > 2) {
                socket.emit('join-room', {
                  name: nameRef.current.value,
                  code: codeRef.current.value
                })
                window.location.href = `/not-wordle/lobby?code=${codeRef.current.value}`
              } else {
                alert("name and code must be at least 3 characters");
              }
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
                socket.emit('create-room', {
                  name: nameRef.current.value,
                  code: codeRef.current.value
                })
                window.location.href = `/not-wordle/lobby?code=${codeRef.current.value}`
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
