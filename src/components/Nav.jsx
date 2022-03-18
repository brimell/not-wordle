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
		lobby,
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
				<HomeLink />
				{game || (lobby && <MessagesLink />)}
				{location.pathname === "/classic" && <EmptyLink />}
				<Title />
				{lobby && <EmptyLink />}
				<StatsLink />
				{location.pathname === "/classic" && <SettingsLink />}
				{game && <GridLink />}
			</ul>
		</nav>
	);
}

function Title() {
	return <h1>not wordle</h1>;
}
function HomeLink() {
	const { socket, setLobby, setPodium, setGame } = useContext(MainContext);
	return (
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
	);
}
function MessagesLink() {
	const { messagesOpen } = useContext(MainContext);
	return (
		<li className="navbar__item">
			<a className="navbar__link" onClick={messagesOpen}>
				<MessageSquare />
				<span>Messages</span>
			</a>
		</li>
	);
}

function GridLink() {
	return (
		<li className="navbar__item">
			<a className="navbar__link">
				<Grid />
				<span>Grid</span>
			</a>
		</li>
	);
}
function SettingsLink() {
	const { setSeedUpdate, settings, setSettings } = useContext(MainContext);
	return (
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
	);
}

function StatsLink() {
	const { statsOpen } = useContext(MainContext);
	return (
		<li className="navbar__item">
			<a className="navbar__link" onClick={statsOpen}>
				<BarChart2 />
				<span>Stats</span>
			</a>
		</li>
	);
}

function EmptyLink() {
	return (
		<li className="navbar__item">
			<a className="navbar__link"></a>
		</li>
	);
}
