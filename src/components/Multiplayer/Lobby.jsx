/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useRef } from "react";
import { MainContext } from "../../context/context";

import GameParent from "../Game/GameParent";
import PlayerListItem from "./PlayerListItem";
import Podium from "./Podium";
import GridViewModal from "../Modals/GridViewModal";
import $ from "jquery";
import MessagesModal from "../Modals/MessagesModal";
import { Socket } from "socket.io-client";

export default function Lobby() {
	const {
		socket,
		lobby,
		name,
		setLobby,
		code,
		users,
		setUsers,
		game,
		setGame,
		isHost,
		setIsHost,
		setTarget,
		podium,
		setPodium,
		grids,
		setGrids,
		setWinner,
		winner,
		setUsername,
		setWordLength,
	} = useContext(MainContext);
	const [multiplayerGrid, setMultiplayerGrid] = useState([]);
	const [fullUsers, setFullUsers] = useState([]);
	const [hardmode, setHardmode] = useState(false);
	const hardmodeRef = useRef();
	const [messages, setMessages] = useState([]);
	const [finishTime, setFinishTime] = useState();

	useEffect(() => {
		setWordLength(5);
	});

	// useEffect(() => {
	// 	console.log(grids);
	// }, [grids]);

	useEffect(() => {
		socket.emit("fetchUserList");
		socket.emit("getUser", socket.id);
		$("#switch");
	}, []);

	async function notification(message) {
		// Check if the browser supports notifications
		if (!("Notification" in window)) {
			// early return if not
			return;
		}

		// Check if the user denied notifications
		if (Notification.permission === "denied") {
			// early return if so
			// console.log('notification denied')
			return;
		}
		await new Promise(async (resolve) => {
			if (Notification.permission === "granted") {
				resolve();
			}

			const result = await Notification.requestPermission();

			if (result === "granted") {
				resolve();
			}
		});
		new Notification(message);
	}

	function getUser(id) {
		socket.emit("fetchFullUsersList");
		socket.on("updateFullUsersList", (userList) => {
			setFullUsers(userList);
			for (let i = 0; i < fullUsers.length; i++) {
				var currUser = fullUsers[i];
				if (currUser.id === id) {
					return currUser;
				}
			}
		});
		socket.off("updateFullUsersList");
	}

	function startGame() {
		socket.emit("start-game", { hardmode: hardmode });
	}

	function allLost() {
		setGame(false);
		setWinner(false);
		setPodium(true);
	}

	function gameLost(id) {
		// console.log(getUser(id), " lost");
		// notification(`${getUser(id).name} lost`);
	}

	async function gameWon(id) {
		if (game === true || podium === false) {
			console.log(id, " won");
			setGame(false);
			socket.emit("getUser", id);
			socket.on("updateRooms", (props) => {
				for (let i = 0; i < props.length; i++) {
					var this_time = 0;
					if (props[i].room === code) {
						function timeStringToSeconds(str) {
							var time = str.split("T");
							var time2 = time[1].replace("Z", "");
							var time3 = time2.split(":");
							var time4 =
								parseInt(time3[0]) * 3600 +
								parseInt(time3[1]) * 60 +
								parseFloat(time3[2]);
							return parseFloat(time4.toFixed(3));
						}
						var start = timeStringToSeconds(props[i].startTime);
						var finish = timeStringToSeconds(props[i].finishTime);
						setFinishTime(finish - start);
						this_time = finish - start;
					}
				}
				console.log(this_time);
				socket.emit("updatePodiumTime", this_time.toFixed(3));
				socket.off("updateRooms");
			});
			await socket.on("getUserRes", (user) => {
				setWinner(user.name);
				socket.off("getUserRes");
			});
			setPodium(true);
		}
	}

	useEffect(() => {
		//? need to be inside useEffect otherwise will be rendered multiple times and multiple listeners will be added
		socket.on("game-started", (props) => {
			if (props.res) {
				// check if game started was initialised by a host
				// setGrids({})	// reset all grids for new game
				setTarget(props.target);
				setHardmode(props.hardmode);
				setGame(true);
				if (!document.hasFocus()) {
					notification("✅ Game Started");
				}
			}
		});
		socket.on("getUserRes", (user) => {
			setUsername(user.name);
		});
		socket.on("gameWon", (id) => {
			gameWon(id);
		});
		socket.on("gameLost", (id) => {
			gameLost(id);
		});
		socket.on("allLost", () => {
			allLost();
		});
		socket.on("update-grid-client", (Grids) => {
			// console.log("got grids", Grids);
			setGrids(Grids);
		});
		socket.on("updateUsersList", (userList) => {
			socket.emit("fetchFullUsersList");
			// if (userList.length > users.length) {
			// 	notification("someone joined!");
			// } else if (userList.length < users.length) {
			// 	notification("someone left...");
			// }
			setUsers(userList);
		});
		socket.on("updateFullUsersList", (userList) => {
			setFullUsers(userList);
			setIsHost(
				userList.find((user) => user.id === socket.id).role === "host"
			);
		});
		return () => {
			// cleans up the socket listeners
			socket.off("game-started");
			socket.off("getUserRes");
			socket.off("gameWon");
			socket.off("gameLost");
			socket.off("allLost");
			socket.off("update-grid-client");
			socket.off("updateUsersList");
			socket.off("updateFullUsersList");
		};
	}, [socket]);

	return (
		<div className="container">
			<MessagesModal messages={messages} setMessages={setMessages} />
			{!game && !podium && (
				<div className="lobby back-row-toggle splat-toggle">
					<h2 className="lobby-title">
						Game Code: <span className="code-txt">{code}</span>
					</h2>
					{users.length === 1 && (
						<h2
							style={{ fontSize: "1rem", marginTop: "-20px" }}
							className="loading-text"
						>
							Waiting for players
						</h2>
					)}

					<div className="lobby-body">
						<div className="player-list">
							{users.map((user, i) => {
								return <PlayerListItem user={user} key={i} />;
							})}
						</div>
						<div className="lobby-btns">
							{isHost && users.length > 1 && (
								<button
									className="primary start-game-btn"
									onClick={() => {
										startGame();
									}}
								>
									Start game
								</button>
							)}
							<button
								className="secondary leave-room-btn"
								onClick={() => {
									socket.emit("leave-room");
									setLobby(false);
								}}
							>
								Leave
							</button>
							{isHost && (
								<>
									<input
										onChange={() => {
											setHardmode(
												hardmodeRef.current.checked
											);
										}}
										ref={hardmodeRef}
										type="checkbox"
										id="switch"
									/>
									<label htmlFor="switch">
										Hard Mode Toggle
									</label>
									<span>Hard Mode</span>
								</>
							)}
						</div>
					</div>
				</div>
			)}
			{game && (
				<GameParent
					hardmode={hardmode}
					socket={socket}
					multiplayerGrid={multiplayerGrid}
					setMultiplayerGrid={setMultiplayerGrid}
				/>
			)}
			{(game || podium) && $(window).width() >= 1000 && (
				<div className="gridBar">
					{grids &&
						Object.keys(grids).map((nameProp, i) => {
							if (podium && nameProp !== winner) {
								// pass
							} else if (nameProp === winner) {
								return "";
							} else if (name === nameProp) {
								return "";
							}
							if (grids[nameProp].length > 0) {
								return (
									<div className="gridItem" key={i}>
										<span className="nameTitle">
											{nameProp}
										</span>
										{grids[nameProp].map((row, j) => {
											return (
												<div
													className="gridRow"
													key={j}
												>
													{row.map((letter, k) => {
														return (
															<div
																className={`gridLetter letter-clue-${letter.clue}`}
																key={k}
															>
																{podium &&
																	letter.letter}
															</div>
														);
													})}
												</div>
											);
										})}
									</div>
								);
							}
						})}
				</div>
			)}
			{/* {(game || podium) && $(window).width() < 1000 && <GridViewModal />} */}

			{podium && (
				<Podium
					finishTime={finishTime}
					setMultiplayerGrid={setMultiplayerGrid}
				/>
			)}
		</div>
	);
}
