import React, { useRef, useEffect } from "react";
import "firebase/compat/database";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import "./Multiplayer.css";
import socket from "../socketio";
import Lobby from './Lobby'

export default function Multiplayer() {
  const nameRef = useRef("");
  const codeRef = useRef("");

  const [lobby, setLobby] = React.useState(false);
  useEffect(() => {
    socket.emit('fetchUserList')
    socket.on('user-list', (userList) => {
      if (userList !== false) {
        setLobby(true)
        // console.log('userList: ',userList)
      }
    })
  }, [lobby])

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
      {!lobby && 
      <div className="join">
        <CustomTextField inputRef={nameRef} className="input-div" label="Name" />
      <CustomTextField inputRef={codeRef} className="input-div" label="Code" />
      <div className="form-container">
        <div className="join-game">
          <Button
            className="join-game-btn"
            variant="contained"
            onClick={() => {
              if (nameRef.current.value.length > 2 && codeRef.current.value.length > 2) {
                socket.emit('joinRoom', {
                  name: nameRef.current.value,
                  room: codeRef.current.value,
                  role: 'user'
                })
                socket.on('joinRoomRes', (props) => {
                  console.log('res: ',props.res)
                  if (props.res === true) {
                    setLobby(true)
                  } else {
                    alert('that name is taken')
                  }
                })
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
                socket.emit('joinRoom', {
                  name: nameRef.current.value,
                  room: codeRef.current.value,
                  role: 'host'
                })
                setLobby(true)
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
      }
      {lobby && 
      <Lobby setLobby={setLobby} room={codeRef.current.value} />}
      
    </div>
  );
}
