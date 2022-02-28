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
	const multiplayerGrid = props.multiplayerGrid
	const setMultiplayerGrid = props.setMultiplayerGrid;
	const [prevMGrid, setprevMGrid] = useState([]);

	useEffect(() => {
		if (socket && multiplayerGrid.length !== 0 && prevMGrid !== multiplayerGrid) {
			socket.emit("update-grid", multiplayerGrid);
			setprevMGrid(multiplayerGrid);
			console.log('ran')
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
