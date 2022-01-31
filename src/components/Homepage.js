import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Multiplayer from "./Multiplayer";
import GameParent from "./GameParent";

export default function Homepage() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <div className="homepage">
            <Link to="/multiplayer">Multiplayer</Link>
            <Link to="/game">Normal</Link>
          </div>
        </Route>
        <Route path="/multiplayer">
          <Multiplayer />
        </Route>
        <Route path="/game">
            <GameParent />
        </Route>
      </Routes>
    </Router>
  );
}
