import React from "react";
import { Link } from "react-router-dom";
// import AdSense from "react-adsense";
import $ from 'jquery'

export default function Homepage() {

  $('body').css('background-color', 'var(--bg)')
  
  return (
    <div className="homepage">
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
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="none"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path
							d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"
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
