import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../../context/context";

import Lobby from "./Lobby";
import ServerBrowser from "./ServerBrowser";
import Login from "./Login";
import { gsap, Power4 } from "gsap";
import $ from 'jquery'
// import { Search } from "react-feather";

export default function Multiplayer(props) {
	const { socket, lobby, code, name, CreateGameOpen } =
		useContext(MainContext);

	const [rooms, setRooms] = useState([]);
	const [login, setLogin] = useState(false);

	useEffect(() => {
		socket.emit("fetchRooms");
	}, [socket]);

	useEffect(() => {
		//? need to be inside useEffect otherwise will be rendered multiple times and multiple listeners will be added
		socket.on("updateRooms", (rooms) => {
			// console.log("updated rooms", rooms);
			setRooms(rooms); //? returns utils.rooms
			// this may cause an error if component is unmounted
		});
		socket.on("fetchRoomsRes", (rooms) => {
			// console.log("updated rooms from fetch: ", rooms);
			setRooms(rooms);
		});
		return () => {
			// return of useEffect cleans up the listeners
			socket.off("updateRooms");
			socket.off("fetchRoomsRes");
		};
	}, [socket]);

	useEffect(() => {
		if (name === "") {
			setLogin(true);
		}
		const tl = gsap.timeline({ defaults: { ease: Power4.easeOut } });
		const buttons = $('.multiplayer-buttons-container')[0].children
		const serverBrowser = $('.server-browser')[0].children
		tl.staggerFrom(buttons, 0.5, { y: "-100%", opacity: 0, delay: 0.5, }, 0.1);
		tl.staggerFrom(serverBrowser, 0.5, { y: "-100%", opacity: 0, delay: 0.5, }, 0.1);
	}, []);

	return (
		<div className="multiplayer">
			{!lobby && login && <Login setLogin={setLogin} />}
			{!lobby && !login && (
				<div className="join-container">
					<div className="join">
						<div className="title-container">
							<div className="multiplayer-heading-container flex">
								<h2 id="serverBrowserHeader">Server Browser</h2>
							</div>
							{/* <div className="search">
								<input
									type="text"
									placeholder="Search..."
								></input>
								<button className="search-btn">
									<Search color="white" />
								</button>
							</div> */}
							<div className="multiplayer-buttons-container flex">
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
						</div>
						{rooms.length === 0 && (
							<h5>no one is hosting a game right now...</h5>
						)}
						<ServerBrowser rooms={rooms} />
					</div>
				</div>
			)}
			{lobby && <Lobby />}
		</div>
	);
}
