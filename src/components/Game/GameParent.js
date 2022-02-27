/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import { MainContext } from "../../context/context";
import Game from "./Game";
import Settings from "../Modals/Settings";
import { useEffect } from "react";

export default function GameParent(props) {
	const socket = props.socket;
	const { settings, target, setTarget } = useContext(MainContext);
	const [currentGrid, setCurrentGrid] = useState([]);
	const [multiplayerGrid, setMultiplayerGrid] = useState([]);

	useEffect(() => {
		if (socket && multiplayerGrid.length !== 0) {
			socket.emit("update-grid", multiplayerGrid);
		}
	}, [multiplayerGrid]);

	function handleGameFinish(gameState) {
		socket.emit("gameFinish", gameState);
	}

	return (
		<div className="GameContainer">
			{settings && <Settings />}
			<Game
				socket={socket}
				setMultiplayerGrid={setMultiplayerGrid}
				multiplayerGrid={multiplayerGrid}
				target={target || false}
				setCurrentGrid={setCurrentGrid}
				handleGameFinish={handleGameFinish}
			/>
		</div>
	);
}
