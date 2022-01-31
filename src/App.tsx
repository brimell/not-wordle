import "./App.css";
import { seed } from "./components/util";
import { useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";

import MainNav from "./components/MainNav";
import StatsModal from "./components/StatsModal";
import Homepage from "./components/Homepage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Multiplayer from "./components/Multiplayer";
import GameParent from "./components/GameParent";

if (!localStorage.getItem("wordMode")) {
  localStorage.setItem("wordMode", "todaysWord");
}

function App() {
  const [seedUpdate, setSeedUpdate] = useState(seed);
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
  });
  const [settings, setSettings] = useState(false);
  const maxGuesses = 6;
  useEffect(() => {
    if (localStorage.getItem("wordMode") === "todaysWord") {
      sessionStorage.setItem(
        "seed",
        new Date().toISOString().replace(/-/g, "").slice(0, 8)
      );
    }
  }, []);

  return (
    <Router>
      <div className="App-container">
        <StatsModal modal={Modal} close={close} />
        <MainNav
          settings={settings}
          setSettings={setSettings}
          setSeedUpdate={setSeedUpdate}
          open={open}
        />

        <Routes>
          <Route path="/not-wordle" element={<Homepage />}>
          </Route>
          <Route path="/not-wordle/multiplayer" element={<Multiplayer />}>
          </Route>
          <Route path="/not-wordle/game" element={<GameParent settings={settings} maxGuesses={maxGuesses} seedUpdate={seedUpdate} />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
