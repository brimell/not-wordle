import "./App.css";
import { seed } from "./components/util";
import React, { useState, useEffect, useRef } from "react";
import { useModal } from "react-hooks-use-modal";

import MainNav from "./components/Nav/MainNav";
import StatsModal from "./components/Modals/StatsModal";
import Homepage from "./components/Homepage/Homepage";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Multiplayer from "./components/Multiplayer/Multiplayer";
import GameParent from "./components/Game/GameParent";
import Mathler from "./components/Mathler/Mathler";
import CreateGameModal from "./components/Modals/CreateGameModal";
import socket from "./components/socketio";

if (!localStorage.getItem("wordMode")) {
	localStorage.setItem("wordMode", "todaysWord");
}

function App() {
	const [lobby, setLobby] = useState(false);
	const [code, setCode] = useState("");
	const [name, setName] = useState(localStorage.getItem("name") || "");
	const maxGuesses = 6;
	const [seedUpdate, setSeedUpdate] = useState(seed);
	const [settings, setSettings] = useState(false);

	const [statsModal, statsOpen, statsClose, statsIsOpen] = useModal("root", {
		preventScroll: true,
	});
	const [createGameModal, CreateGameOpen, CreateGameClose, CreateGameIsOpen] =
		useModal("root", {
			preventScroll: true,
		});

	useEffect(() => {
		if (localStorage.getItem("wordMode") === "todaysWord") {
			sessionStorage.setItem(
				"seed",
				new Date().toISOString().replace(/-/g, "").slice(0, 8)
			);
		}
	}, []);

	return (
		<Router>
			<div className="App-container target-light">
				<CreateGameModal
					name={name}
					code={code}
					setCode={setCode}
					lobby={lobby}
					setLobby={setLobby}
					close={CreateGameClose}
					modal={createGameModal}
				/>
				<StatsModal
					isOpen={statsIsOpen}
					socket={socket}
					modal={statsModal}
					close={statsClose}
				/>
				<MainNav
					setLobby={setLobby}
					socket={socket}
					settings={settings}
					setSettings={setSettings}
					setSeedUpdate={setSeedUpdate}
					open={statsOpen}
				/>

				<Routes>
					<Route path="/" element={<Homepage />}></Route>
					<Route
						path="/multiplayer"
						element={
							<Multiplayer
								socket={socket}
								name={name}
								setName={setName}
								code={code}
								setCode={setCode}
								CreateGameOpen={CreateGameOpen}
								lobby={lobby}
								setLobby={setLobby}
							/>
						}
					></Route>
					<Route
						path="/game"
						element={
							<GameParent
								settings={settings}
								maxGuesses={maxGuesses}
								seedUpdate={seedUpdate}
							/>
						}
					></Route>
					<Route path="/mathler" element={<Mathler />}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
