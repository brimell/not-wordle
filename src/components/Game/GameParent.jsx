/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import { MainContext } from "../../context/context";
import Game from "./Game";
import { useEffect } from "react";

export default function GameParent(props) {
	const socket = props.socket;
	const { target } = useContext(MainContext);
	const [currentGrid, setCurrentGrid] = useState([]);
	const multiplayerGrid = props.multiplayerGrid
	const setMultiplayerGrid = props.setMultiplayerGrid;
	const [prevMGrid, setprevMGrid] = useState([]);

	useEffect(() => {
		if (socket && multiplayerGrid.length !== 0 && prevMGrid !== multiplayerGrid) {
			socket.emit("update-grid", multiplayerGrid);
			setprevMGrid(multiplayerGrid);
		}
	}, [multiplayerGrid]);

	function handleGameFinish(gameState) {
		socket.emit("gameFinish", gameState);
		setMultiplayerGrid([]);
	}

	return (
		<div className="GameContainer">
			<Game
				hardmode={props.hardmode}
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
