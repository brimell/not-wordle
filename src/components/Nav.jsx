/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { MainContext } from "../context/context";
import { Home, Settings, X, User, MessageSquare } from "react-feather";

import { Link } from "react-router-dom";

export default function MainNav() {
	const {
		socket,
		setLobby,
		setSeedUpdate,
		settings,
		setSettings,
		statsOpen,
		messagesOpen,
		setPodium,
		setGame,
	} = useContext(MainContext);

	return (
		<nav className="navbar">
			<ul className="navbar__menu">
				<li className="navbar__item">
					<Link
						className="navbar__link"
						to="/"
						id="homeButton"
						onClick={() => {
							socket.emit("leave-room");
							setLobby(false);
							setPodium(false);
							setGame(false)
						}}
					>
						<Home />
						<span>Home</span>
					</Link>
				</li>
				<li className="navbar__item">
					<a className="navbar__link" onClick={messagesOpen}>
						<MessageSquare />
						<span>Messages</span>
					</a>
				</li>
				<h1>not wordle</h1>
				<li className="navbar__item">
					<a className="navbar__link" onClick={statsOpen}>
						<User />
						<span>Stats</span>
					</a>
				</li>
				<li className="navbar__item">
					<a
						className="navbar__link"
						onClick={() => {
							setSeedUpdate(
								Number(sessionStorage.getItem("seed")) || false
							);
							setSettings((a) => !a);
						}}
					>
						{!settings ? <Settings /> : <X />}
						<span>Settings</span>
					</a>
				</li>
			</ul>
		</nav>
	);
}
