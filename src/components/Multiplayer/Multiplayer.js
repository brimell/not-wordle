import React, { useState, useEffect } from "react";
import "firebase/compat/database";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import "./Multiplayer.css";
import Lobby from "./Lobby";
import ServerBrowser from "./ServerBrowser";
import { Search, Plus } from "react-feather";
import Notification from "../Notification/Notification";

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

export default function Multiplayer(props) {
  const lobby = props.lobby;
  const setLobby = props.setLobby;
  const code = props.code;
  const nameRef = props.nameRef;
  const socket = props.socket;
  const [rooms, setRooms] = useState([]);
  const name = props.name;
  const setName = props.setName;

  const CreateGameOpen = props.CreateGameOpen;

  useEffect(() => {
    socket.emit("fetchRooms");
  }, [socket]);

  useEffect(() => {
    if (name !== "") {
      localStorage.setItem("name", name);
    }
  }, [name]);

  socket.on("updateRooms", (rooms) => {
    // console.log("updated rooms", rooms);
    setRooms(rooms);
  });
  socket.on("fetchRoomsRes", (rooms) => {
    // console.log("updated rooms from fetch: ", rooms);
    setRooms(rooms);
  });

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <div className="multiplayer">
      <Notification />
      {!lobby && (
        <div className="join-container">
          <input
            id="name-input"
            className="neumorphic-input"
            type="text"
            placeholder="Name..."
            value={name}
            onChange={handleNameChange}
          ></input>
          <div className="join">
            <h2 id="serverBrowserHeader">Server Browser</h2>
            <div className="search-container">
              <div className="search">
                <input
                  className="neumorphic-input"
                  type="text"
                  placeholder="Search..."
                ></input>
                <button className="search-btn">
                  <Search color="white" />
                </button>
              </div>
              <div className="add">
                <button
                  className="add-btn"
                  onClick={() => {
                    CreateGameOpen();
                  }}
                >
                  <Plus color="white" />
                </button>
              </div>
            </div>
            {rooms.length === 0 && <h2>no one is hosting a game right now...</h2>}
            <ServerBrowser
              setLobby={setLobby}
              name={name}
              socket={socket}
              rooms={rooms}
            />

            {/* 
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
            
          </div> */}
          </div>
        </div>
      )}
      {lobby && <Lobby setLobby={setLobby} room={code} />}
    </div>
  );
}
