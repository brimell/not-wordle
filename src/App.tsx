import "./App.css";
// import common from "./common.json";
import { seed } from "./components/util";
import Game from "./components/Game";
import { useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";

import MainNav from './components/MainNav';
import StatsModal from './components/StatsModal';
import Settings from './components/Settings';

if (!localStorage.getItem("wordMode")) {
  localStorage.setItem("wordMode", "todaysWord");
}

function App() {
  const [seedUpdate, setSeedUpdate] = useState(seed);
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    // closeOnOverlayClick: false
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
    <div className="App-container">
      <StatsModal modal={Modal} close={close} />
      <MainNav settings={settings} setSettings={setSettings} setSeedUpdate={setSeedUpdate} open={open}/>
      <div className="GameContainer">
        {settings && (
          <Settings seedUpdate={seedUpdate}/>
        )}
        <Game maxGuesses={maxGuesses} hidden={settings} />
      </div>
    </div>
  );
}

export default App;
