import { useEffect, lazy } from "react";
import { Link } from "react-router-dom";
import { gsap, Power3 } from "gsap";
import $ from "jquery";
import nwLogo from "/nw-outline.svg";
import multiplayerSVG from "/multiplayer.svg";
import timedSVG from "/timed.svg";

export default function Homepage() {
	useEffect(() => {
		$("body").css("background-color", "var(--bg)");

		const links = $(".gameMenu-grid-item");
		const tl = gsap.timeline({ defaults: { ease: Power3.easeOut } });
		tl.staggerFrom(links, 0.5, { y: "-100%", opacity: 0 }, 0.1);
		tl.from(".homepage-header", { y: "-100%", opacity: 0, duration: 0.5 }, 0.1);

	}, []);

	return (
		<>
			<div className="homepage-header">
				<h1 className="homepage-header-title">Not Wordle</h1>
				<h5 className="homepage-header-sub">Wordle. But Multiplayer</h5>
			</div>
			<div className="homepage">
				<GameMenu />
			</div>
			<FloatingBackground />
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
				<Link to={'#'} className="link">
				{/* <Link to="/timed" className="link"> */}
					<img src={timedSVG}></img>
					<h1>(WIP)</h1>
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
