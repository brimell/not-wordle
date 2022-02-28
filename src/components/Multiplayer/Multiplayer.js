import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../../context/context";

import Lobby from "./Lobby";
import ServerBrowser from "./ServerBrowser";
import Login from "./Login";

import { Search } from "react-feather";
import Notification from "../Notification/Notification";

export default function Multiplayer(props) {
	const { socket, lobby, code, name, CreateGameOpen } =
		useContext(MainContext);

	const [rooms, setRooms] = useState([]);
	const [login, setLogin] = useState(false);

	useEffect(() => {
		socket.emit("fetchRooms");
	}, [socket]);

	socket.on("updateRooms", (rooms) => {
		// console.log("updated rooms", rooms);
		setRooms(rooms); //? returns utils.rooms
	});
	socket.on("fetchRoomsRes", (rooms) => {
		// console.log("updated rooms from fetch: ", rooms);
		setRooms(rooms);
	});

	useEffect(() => {
		if (name === "") {
			setLogin(true);
		}
	}, []);

	return (
		<div className="multiplayer">
			<Notification />
			{!lobby && login && <Login setLogin={setLogin} />}
			{!lobby && !login && (
				<div className="join-container">
					<div className="join">
						<h2 id="serverBrowserHeader">Server Browser</h2>
						<div className="search-container">
							<div className="search">
								<input
									type="text"
									placeholder="Search..."
								></input>
								<button className="search-btn">
									<Search color="white" />
								</button>
							</div>
							<div className="add">
								<button
									className="primary add-btn"
									onClick={() => {
										CreateGameOpen();
									}}
								>
									{/* <Plus color="white" /> */}
									Create Game
								</button>
							</div>
							<button
								className="changeNameBtn secondary"
								onClick={() => {
									setLogin(true);
								}}
							>
								Change Name
							</button>
						</div>
						{rooms.length === 0 && (
							<h5>no one is hosting a game right now...</h5>
						)}
						<ServerBrowser rooms={rooms} />

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
			{lobby && <Lobby />}
		</div>
	);
}
