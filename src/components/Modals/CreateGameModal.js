import React, { useRef, useContext } from "react";
import "react-hooks-use-modal";
import CloseIcon from "@mui/icons-material/Close";
import socket from '../socketio'
import { MainContext } from '../../context/context'

export default function CreateGameModal() {
  const {
		setLobby,
		code,
		setCode,
		name,
		createGameModal,
		CreateGameOpen,
		CreateGameClose,
		CreateGameIsOpen,
	} = useContext(MainContext);

  const Modal = createGameModal;
  const Close = CreateGameClose;
  const codeRef = useRef("");

  return (
    <Modal>
      <div className="modalContainer">
        <CloseIcon onClick={Close} className="modalCloseIcon" />
        <h1 className="statsHeader">Create Game</h1>
        <input
          type="text"
          placeholder="Game Code..."
          ref={codeRef}
        ></input>
        <div className="create-game">
          <button
            className="create-game-btn neumorphic-btn"
            onClick={() => {
              setCode(codeRef.current.value);
              socket.emit("fetchRooms");
              socket.on("fetchRoomsRes", (rooms) => {
                var dupe = false;
                if (rooms.length > 0) {
                  for (var i = 0; i < rooms.length; i++) {
                    var room = rooms[i].room;
                    if (room === code) {
                      alert("that room already exists");
                      dupe = true;
                      return;
                    }
                  }
                }
                if (
                  name.length > 2 &&
                  codeRef.current.value.length > 2 &&
                  !dupe
                ) {
                  socket.emit("joinRoom", {
                    name: name,
                    room: codeRef.current.value,
                    role: "host",
                  });
                  Close()
                  setLobby(true);
                } else if (name.length < 3) {
                  Close()
                  document.getElementById("name-input").focus();
                } else {
                  alert("name and code must be at least 3 characters");
                }
              });
            }}
          >
            Create Game
          </button>
        </div>
      </div>
    </Modal>
  );
}
