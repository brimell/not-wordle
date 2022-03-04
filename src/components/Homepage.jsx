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
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20 12L20.3536 11.6464L20.7071 12L20.3536 12.3536L20 12ZM5 12.5C4.72386 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.72386 11.5 5 11.5V12.5ZM14.3536 5.64645L20.3536 11.6464L19.6464 12.3536L13.6464 6.35355L14.3536 5.64645ZM20.3536 12.3536L14.3536 18.3536L13.6464 17.6464L19.6464 11.6464L20.3536 12.3536ZM20 12.5H5V11.5H20V12.5Z"
								fill="white"
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
