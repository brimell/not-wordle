import React from "react";
import { Link } from "react-router-dom";
import AdSense from "react-adsense";
import "./Homepage.scss";

export default function Homepage() {

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
          </button>
        </Link>
        <Link to="/game" className="link">
          <button className="singleplayer-btn">Singleplayer</button>
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
