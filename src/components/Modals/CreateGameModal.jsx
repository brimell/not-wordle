import React, { useRef, useContext, useEffect } from "react";
import "react-hooks-use-modal";
import { X } from "react-feather";
import socket from "../socketio";
import { MainContext } from "../../context/context";
import { gsap, Power3 } from "gsap";
import $ from "jquery";
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

	useEffect(() => {
		const ease = Power3.easeOut;
		const modalContainer = $(".modalContainer")[0];
		if (modalContainer) {
			gsap.from(modalContainer, {
				y: "100%",
				duration: 1,
				ease,
			});
		}
	});

	// useEffect(() => {
	// 	function onKeyDown(e) {
	// 		if (e.key === "Enter") {
	// 			createGame()
	// 		}
	// 	}
	// 	document.addEventListener("keydown", onKeyDown);
	// 	return () => {
	// 		document.removeEventListener("keydown", onKeyDown);
	// 	};
	// }, []);

	function createGame() {
		setCode(codeRef.current.value);
		socket.emit("fetchRooms");
		socket.on("fetchRoomsRes", (rooms) => {
			var dupe = false;
			if (rooms.length > 0) {
				for (var i = 0; i < rooms.length; i++) {
					if (rooms[i].room === codeRef.current.value) {
						alert("that room already exists");
						dupe = true;
						return;
					}
				}
			}
			if (name.length > 2 && codeRef.current.value.length > 2 && !dupe) {
				socket.emit("joinRoom", {
					name: name,
					room: codeRef.current.value,
					role: "host",
				});
				Close();
				setLobby(true);
			} else if (name.length < 3) {
				Close();
				document.getElementById("name-input").focus();
			} else {
				alert("name and code must be at least 3 characters");
			}
			socket.off("fetchRoomsRes"); // otherwise another listener is created after button clicked - needs to be inside the socket.on
		});
	}

	return (
		<Modal>
			<div className="modalContainer">
				<X onClick={Close} className="modalCloseIcon" />
				<h1 className="statsHeader">Create Game</h1>
				<input
					type="text"
					placeholder="Game Code..."
					ref={codeRef}
				></input>
				<div className="create-game">
					<button
						className="create-game-btn neumorphic-btn"
						onClick={createGame}
					>
						Create Game
					</button>
				</div>
			</div>
		</Modal>
	);
}
