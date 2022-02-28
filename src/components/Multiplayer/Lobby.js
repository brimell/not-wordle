/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { MainContext } from "../../context/context";

import GameParent from "../Game/GameParent";
import PlayerListItem from "./PlayerListItem.js";
import Podium from "./Podium";
import GridViewModal from "../Modals/GridViewModal";
import $ from "jquery";

export default function Lobby() {
	const {
		socket,
		lobby,
		setLobby,
		code,
		users,
		setUsers,
		game,
		setGame,
		startHide,
		setStartHide,
		setTarget,
		podium,
		setPodium,
		grids,
		setGrids,
		setWinner,
		username,
		setUsername,
		setWordLength,
	} = useContext(MainContext);
	const [multiplayerGrid, setMultiplayerGrid] = useState([]);

	setWordLength(5);

	useEffect(() => {
		console.log(grids)
	}, [grids])

	useEffect(() => {
		socket.emit("fetchUserList");
		socket.emit("getUser", socket.id);
	}, []);

	function startGame() {
		socket.emit("start-game");
	}

	function allLost() {
		setGame(false)
		setWinner(false)
		setPodium(true)
	}

	function gameLost(id) {
		console.log(id, " lost");
	}

	async function gameWon(id) {
		if (game === true || podium === false) {
			console.log(id, " won");
			setGame(false);
			socket.emit("getUser", id);
			await socket.on("getUserRes", (user) => {
				setWinner(user.name);
			});
			setPodium(true);
		}
	}

	socket.on("game-started", (props) => {
		if (props.res) { // check if game started was initialised by a host
			setMultiplayerGrid({}) // reset local grid for new game
			setTarget(props.target);
			setGame(true);
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
		setUsers(userList);
	});
	socket.on("updateFullUsersList", (userList) => {
		setStartHide(
			userList.find((user) => user.id === socket.id).role === "host"
		);
	});

	return (
		<div className="container">
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
							{startHide && users.length > 1 && (
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
						</div>
					</div>
				</div>
			)}
			{game && <GameParent socket={socket} multiplayerGrid={multiplayerGrid} setMultiplayerGrid={setMultiplayerGrid} />}
			{(game || podium) && $(window).width() >= 1000 && (
				<div className="gridBar">
					{grids && grids !== {} &&
						Object.keys(grids).map((nameProp, i) => {
							if (nameProp === username) {
								return "";
							} else {
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

			{podium && <Podium />}
		</div>
	);
}
