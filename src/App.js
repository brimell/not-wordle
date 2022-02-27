import React, { useState, useEffect, Suspense, lazy } from "react";
import "./styles/__main.scss";

import { seed } from "./components/util";
import "./components/firebaseInit";

import { useModal } from "react-hooks-use-modal";

import Loading from "./components/Loading";
import Nav from "./components/Nav";

import { Router, Routes, Route } from "react-router-dom";
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
import socket from "./components/socketio";

const Multiplayer = lazy(() => import("./components/Multiplayer/Multiplayer"));
const GameParent = lazy(() => import("./components/Game/GameParent"));
const Mathler = lazy(() => import("./components/Mathler"));
const CreateGameModal = lazy(() =>
	import("./components/Modals/CreateGameModal")
);
const Homepage = lazy(() => import("./components/Homepage"));
const MessagesModal = lazy(() => import("./components/Modals/MessagesModal"));
const StatsModal = lazy(() => import("./components/Modals/StatsModal"));

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
	const [messagesModal, messagesOpen, messagesClose, messagesIsOpen] =
		useModal("root", {
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
			<Suspense fallback={<Loading />}>
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
					<MessagesModal
						isOpen={messagesIsOpen}
						socket={socket}
						modal={messagesModal}
						close={messagesClose}
						name={name}
					/>
					<Nav
						setLobby={setLobby}
						socket={socket}
						settings={settings}
						setSettings={setSettings}
						setSeedUpdate={setSeedUpdate}
						statsOpen={statsOpen}
						messagesOpen={messagesOpen}
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
									setSettings={setSettings}
									settings={settings}
									maxGuesses={maxGuesses}
									seedUpdate={seedUpdate}
								/>
							}
						></Route>
						<Route path="/mathler" element={<Mathler />}></Route>
					</Routes>
				</div>
			</Suspense>
		</Router>
	);
}

export default App;
