/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect } from "react";
import { MainContext } from "../context/context";
import {
	Home,
	Settings,
	X,
	BarChart2,
	MessageSquare,
	Grid,
} from "react-feather";
import { gsap, Power3 } from "gsap";
import { Link, useLocation } from "react-router-dom";

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
		game,
	} = useContext(MainContext);

	useEffect(() => {
		const ease = Power3.easeOut;
		gsap.from(".navbar", { y: "-100%", opacity: 0, duration: 1, ease });
	}, []);

	const location = useLocation();
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
							setGame(false);
						}}
					>
						<Home />
						<span>Home</span>
					</Link>
				</li>
				{game && (
					<li className="navbar__item">
						<a className="navbar__link" onClick={messagesOpen}>
							<MessageSquare />
							<span>Messages</span>
						</a>
					</li>
				)}
				{location.pathname === "/classic" && (
					<li className="navbar__item">
						<a className="navbar__link">
							{/* {!settings ? <Settings /> : <X />}
						<span>Settings</span> */}
						</a>
					</li>
				)}
				<h1>not wordle</h1>
				<li className="navbar__item">
					<a className="navbar__link" onClick={statsOpen}>
						<BarChart2 />
						<span>Stats</span>
					</a>
				</li>
				{location.pathname === "/classic" && (
					<li className="navbar__item">
						<a
							className="navbar__link"
							onClick={() => {
								setSeedUpdate(
									Number(sessionStorage.getItem("seed")) ||
										false
								);
								setSettings((a) => !a);
							}}
						>
							{!settings ? <Settings /> : <X />}
							<span>Settings</span>
						</a>
					</li>
				)}
				{game && (
					<li className="navbar__item">
						<a className="navbar__link">
							<Grid />
							<span>Grid</span>
						</a>
					</li>
				)}
			</ul>
		</nav>
	);
}
