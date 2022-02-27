import React, { createContext, useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";
import { seed } from "../components/util";
import socket from "../components/socketio";

export const MainContext = createContext();

export function ContextProvider(props) {
	const [lobby, setLobby] = useState(false);
	const [code, setCode] = useState("");
	const [name, setName] = useState(localStorage.getItem("name") || "");
	const maxGuesses = 6;
	const [seedUpdate, setSeedUpdate] = useState(seed);
	const [settings, setSettings] = useState(false);

	const [users, setUsers] = useState([]);
	const [game, setGame] = useState(false);
	const [startHide, setStartHide] = useState(false);
	const [target, setTarget] = useState("");
	const [podium, setPodium] = useState(false);
	const [grids, setGrids] = useState({});
	const [winner, setWinner] = useState(false);
	const [username, setUsername] = useState("");

	// modals

	const [gridViewModal, gridViewOpen, gridViewClose, gridViewIsOpen] =
		useModal("root", {
			preventScroll: true,
		});
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
		console.log('lobby: ',lobby);
	}, [lobby]);

	return (
		<MainContext.Provider
			value={{
				socket,
				lobby,
				setLobby,
				code,
				setCode,
				name,
				setName,
				maxGuesses,
				seedUpdate,
				setSeedUpdate,
				settings,
				setSettings,
				statsModal,
				statsOpen,
				statsClose,
				statsIsOpen,
				messagesModal,
				messagesOpen,
				messagesClose,
				messagesIsOpen,
				createGameModal,
				CreateGameOpen,
				CreateGameClose,
				CreateGameIsOpen,
				gridViewModal,
				gridViewOpen,
				gridViewClose,
				gridViewIsOpen,
				users,
				setUsers,
				game,
				setGame,
				startHide,
				setStartHide,
				target,
				setTarget,
				podium,
				setPodium,
				grids,
				setGrids,
				winner,
				setWinner,
				username,
				setUsername,
			}}
		>
			{props.children}
		</MainContext.Provider>
	);
}
