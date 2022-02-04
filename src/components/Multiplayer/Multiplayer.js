import React, { useRef, useEffect } from "react";
import "firebase/compat/database";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import "./Multiplayer.css";
import socket from "../socketio";
import Lobby from "./Lobby";
import ServerBrowser from "./ServerBrowser";

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

export default function Multiplayer() {
  const nameRef = useRef("");
  const codeRef = useRef("");
  const [code, setCode] = React.useState("");
  const [lobby, setLobby] = React.useState(false);
  const [rooms, setRooms] = React.useState([]);
  // useEffect(() => {
  //   socket.emit("fetchRooms");
  // }, []);
  // socket.on("fetchRoomsRes", (rooms) => {
  //   setRooms(rooms);
  // });
  socket.on("updateRooms", (rooms) => {
    console.log('updated rooms')
    setRooms(rooms);
  });

  return (
    <div className="multiplayer">
      {!lobby && (
        <div className="join">
          <CustomTextField
            inputRef={nameRef}
            className="input-div"
            label="Name"
          />
          <CustomTextField
            inputRef={codeRef}
            className="input-div"
            label="Code"
          />
          <div className="form-container">
            <div className="join-game">
              <Button
                className="join-game-btn"
                variant="contained"
                onClick={() => {
                  setCode(codeRef.current.value);
                  socket.emit("fetchUserListByRoom", codeRef.current.value);
                  socket.on("fetchUserListByRoomRes", (users) => {
                    var dupe = false;
                    if (users.length > 0) {
                      for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user === code) {
                          alert("that name is taken in this room");
                          dupe = true;
                          return;
                        }
                      }
                    }
                    if (
                      nameRef.current.value.length > 2 &&
                      codeRef.current.value.length > 2 &&
                      !dupe
                    ) {
                      socket.emit("joinRoom", {
                        name: nameRef.current.value,
                        room: codeRef.current.value,
                        role: "user",
                      });
                      socket.on("joinRoomRes", (props) => {
                        if (props.res === true) {
                          setLobby(true);
                        } else {
                          alert("that name is taken");
                        }
                      });
                    } else {
                      alert("name and code must be at least 3 characters");
                    }
                  });
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
                  setCode(codeRef.current.value);
                  socket.emit("fetchRooms");
                  socket.on("fetchRoomsRes", (rooms) => {
                    var dupe = false;
                    if (rooms.length > 0) {
                      for (var i = 0; i < rooms.length; i++) {
                        var room = rooms[i].room;
                        console.log("room: ", room);
                        if (room === code) {
                          alert("that room already exists");
                          dupe = true;
                          return;
                        }
                      }
                    }
                    if (
                      nameRef.current.value.length > 2 &&
                      codeRef.current.value.length > 2 &&
                      !dupe
                    ) {
                      socket.emit("joinRoom", {
                        name: nameRef.current.value,
                        room: codeRef.current.value,
                        role: "host",
                      });
                      setLobby(true);
                    } else {
                      alert("name and code must be at least 3 characters");
                    }
                  });
                }}
              >
                Create Game
              </Button>
            </div>
          </div>
          <ServerBrowser rooms={rooms} />
        </div>
      )}
      {lobby && <Lobby setLobby={setLobby} room={code} />}
    </div>
  );
}
