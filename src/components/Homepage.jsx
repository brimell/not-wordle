import { lazy } from "react";
import { Link } from "react-router-dom";
// import AdSense from "react-adsense";
import $ from "jquery";
import nwLogo from "../../public/nw.svg";
import multiplayerSVG from "../../public/multiplayer.svg";
import timedSVG from "../../public/timed.svg";

export default function Homepage() {
	$("body").css("background-color", "var(--bg)");

	return (
		<>
			<div className="homepage-header">
				<h1 className="homepage-header-title">Not Wordle</h1>
				<h5 className="homepage-header-sub">Wordle. But Multiplayer</h5>
			</div>
			<div className="homepage">
				<FloatingBackground />
				<GameMenu />
			</div>
		</>
	);
}

function GameMenu() {
	return (
		<div className="gameMenu-grid">
			<div className="gameMenu-grid-item">
				<Link to="/multiplayer" className="link">
					<img src={multiplayerSVG}></img>
					<h1>Multiplayer</h1>
				</Link>
			</div>
			<div className="gameMenu-grid-item">
				<Link to="/classic" className="link">
					<img src={nwLogo}></img>
					<h1>Classic</h1>
				</Link>
			</div>

			<div className="gameMenu-grid-item">
				<Link to="/timed" className="link">
					<img src={timedSVG}></img>
					<h1>Timed</h1>
				</Link>
			</div>
		</div>
	);
}

function FloatingBackground() {
	return (
		<div className="floatingBackground">
			<div className="floatingIcon gridLetter letter-correct">N</div>
			<div className="floatingIcon gridLetter letter-elsewhere">O</div>
			<div className="floatingIcon gridLetter letter-absent">T</div>
			<div className="floatingIcon gridLetter letter-correct">W</div>
			<div className="floatingIcon gridLetter letter-elsewhere">O</div>
			<div className="floatingIcon gridLetter letter-absent">R</div>
			<div className="floatingIcon gridLetter letter-correct">D</div>
			<div className="floatingIcon gridLetter letter-elsewhere">L</div>
			<div className="floatingIcon gridLetter letter-absent">E</div>
			<div className="floatingIcon gridLetter letter-correct">N</div>
			<div className="floatingIcon gridLetter letter-elsewhere">O</div>
			<div className="floatingIcon gridLetter letter-absent">T</div>
			<div className="floatingIcon gridLetter letter-correct">W</div>
			<div className="floatingIcon gridLetter letter-elsewhere">O</div>
			<div className="floatingIcon gridLetter letter-absent">R</div>
			<div className="floatingIcon gridLetter letter-correct">D</div>
			<div className="floatingIcon gridLetter letter-elsewhere">L</div>
			<div className="floatingIcon gridLetter letter-absent">E</div>
		</div>
	);
}
