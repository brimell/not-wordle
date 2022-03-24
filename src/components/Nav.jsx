/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect } from "react";
import { MainContext } from "../context/context";
import {
	Home,
	BarChart2,
	MessageSquare,
	Grid,
} from "react-feather";
import { gsap, Power3 } from "gsap";
import { Link, useLocation } from "react-router-dom";

export default function MainNav() {
	const {
		lobby,
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
				{lobby && <MessagesLink />}
				<Title />
				{lobby && !game && <EmptyLink />}
				<StatsLink />
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
			<a className="navbar__link empty_link"></a>
		</li>
	);
}
