import React from "react";
import { Link } from "react-router-dom";
// import AdSense from "react-adsense";
import $ from "jquery";

export default function Homepage() {
	$("body").css("background-color", "var(--bg)");

	return (
		<div className="homepage">
			<div className="floatingBackground">
				<div className="floatingIcon gridLetter letter-correct">N</div>
				<div className="floatingIcon gridLetter letter-elsewhere">
					O
				</div>
				<div className="floatingIcon gridLetter letter-absent">T</div>
				<div className="floatingIcon gridLetter letter-correct">W</div>
				<div className="floatingIcon gridLetter letter-elsewhere">
					O
				</div>
				<div className="floatingIcon gridLetter letter-absent">R</div>
				<div className="floatingIcon gridLetter letter-correct">D</div>
				<div className="floatingIcon gridLetter letter-elsewhere">
					L
				</div>
				<div className="floatingIcon gridLetter letter-absent">E</div>
				<div className="floatingIcon gridLetter letter-correct">N</div>
				<div className="floatingIcon gridLetter letter-elsewhere">
					O
				</div>
				<div className="floatingIcon gridLetter letter-absent">T</div>
				<div className="floatingIcon gridLetter letter-correct">W</div>
				<div className="floatingIcon gridLetter letter-elsewhere">
					O
				</div>
				<div className="floatingIcon gridLetter letter-absent">R</div>
				<div className="floatingIcon gridLetter letter-correct">D</div>
				<div className="floatingIcon gridLetter letter-elsewhere">
					L
				</div>
				<div className="floatingIcon gridLetter letter-absent">E</div>
			</div>
			<div className="button-container">
				<Link to="/multiplayer" className="link">
					<button
						className="multiplayer-btn"
						onClick={() => {
							sessionStorage.setItem("multiplayer", "true");
						}}
					>
						Multiplayer
						<svg
							width="13"
							height="14"
							viewBox="0 0 13 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6.92894 0.333374L5.87984 1.50837L10.0316 6.16671H0.976562V7.83337H10.0316L5.87984 12.4917L6.92894 13.6667L12.8813 7.00004L6.92894 0.333374Z"
								fill="currentColor"
							/>
						</svg>
					</button>
				</Link>
				<Link to="/game" className="link">
					<button className="singleplayer-btn">Singleplayer</button>
				</Link>
				<Link to="/mathler" className="link">
					<button className="multiplayer-btn">Mathler</button>
				</Link>
				<Link to="/quordle" className="link">
					<button className="singleplayer-btn">Quordle</button>
				</Link>
			</div>
			{/* <AdSense.Google
        client="ca-pub-8576400028620199"
        // slot="7806394673"
        style={{ width: 500, height: 300, float: "left" }}
        format=""
      /> */}
		</div>
	);
}
