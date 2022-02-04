import "./App.css";
import { seed } from "./components/util";
import { useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";

import MainNav from "./components/Nav/MainNav";
import StatsModal from "./components/Modals/StatsModal";
import Homepage from "./components/Homepage";
import Lobby from "./components/Multiplayer/Lobby";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Multiplayer from "./components/Multiplayer/Multiplayer";
import GameParent from "./components/Game/GameParent";
import CreateGameModal from "./components/Modals/CreateGameModal";

if (!localStorage.getItem("wordMode")) {
  localStorage.setItem("wordMode", "todaysWord");
}

function App() {
  const [seedUpdate, setSeedUpdate] = useState(seed);
  const [statsModal, statsOpen, statsClose, statsIsOpen] = useModal("root", {
    preventScroll: true,
  });
  const [CreateGameModal, CreateGameOpen, CreateGameClose, CreateGameIsOpen] =
    useModal("root", {
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
      <div className="App-container target-light">
        <CreateGameModal close={CreateGameClose} modal={CreateGameModal} />
        <StatsModal modal={statsModal} close={statsClose} />
        <MainNav
          settings={settings}
          setSettings={setSettings}
          setSeedUpdate={setSeedUpdate}
          open={statsOpen}
        />

        <Routes>
          <Route path="/not-wordle" element={<Homepage />}></Route>
          <Route
            path="/not-wordle/multiplayer"
            element={<Multiplayer CreateGameOpen={CreateGameOpen} />}
          ></Route>
          <Route
            path="/not-wordle/game"
            element={
              <GameParent
                settings={settings}
                maxGuesses={maxGuesses}
                seedUpdate={seedUpdate}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
