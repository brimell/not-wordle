import "./App.css";
import common from "./common.json";
import { dictionarySet, pick, seed } from "./components/util";
import Game from "./components/Game";
import { Row, RowState } from "./components/Row";
import { Clue } from "./components/clue";
import { useState, useEffect } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [settings, setSettings] = useState(false);
  const maxGuesses = 6;
  useEffect(() => { // makes sure the code only gets run once
    if (!sessionStorage.getItem('isPageRefreshed') && localStorage.getItem("wordMode") === "todaysWord") {
      document.location = "?seed=" + new Date().toISOString().replace(/-/g, "").slice(0, 8)
      console.log("redirecting to " + document.location);
      sessionStorage.setItem('isPageRefreshed', 'true');

      
    }
  }, []);
  

  return (
    <div className="App-container">
      <h1>not wordle</h1>
      <div className="settingsIcon">
        <a href="#" onClick={() => setSettings((a) => !a)}>
          {settings ? < CloseIcon fontSize="large" /> : <SettingsIcon fontSize="large" /> }
        </a>
      </div>
      <div className="GameContainer">
        
        {settings && (
        <div className="App-settings">
          <p>You can change this from random to having a different word per day using this button</p>
          <div className="settingsContainer">
            <button
            className={ seed ? 'button is-primary' : 'button is-primary is-outlined'}
            id="todaysWord"
            onClick={() => {
              document.location = "?seed=" + new Date().toISOString().replace(/-/g, "").slice(0, 8)
              localStorage.setItem("wordMode", "todaysWord")
            }
              
            }
          >
            {/* {seed ? "Random Word" : "Today's Word"} */}
            Today's Word
          </button>
          <button
            className={ seed ? 'button is-primary is-outlined' : 'button is-primary'}
            id="randomWord"
            onClick={() => {
              document.location = "/"
              localStorage.setItem("wordMode", "randomWord")
            }
              
            }
          >
            Random Word
          </button>
          </div>
          
          {/* <p>
            <i>not wordle</i> is a remake of the word game{" "}
            <a href="https://www.powerlanguage.co.uk/wordle/">
              <i>Wordle</i>
            </a>
          </p>
          <p>
            You get {maxGuesses} tries to guess a target word.
            <br />
            After each guess, you get Mastermind-style feedback:
          </p>
          <p>
            <Row
              rowState={RowState.LockedIn}
              wordLength={4}
              cluedLetters={[
                { clue: Clue.Absent, letter: "w" },
                { clue: Clue.Absent, letter: "o" },
                { clue: Clue.Correct, letter: "r" },
                { clue: Clue.Elsewhere, letter: "d" },
              ]}
            />
          </p>
          <p>
            <b>W</b> and <b>O</b> aren't in the target word at all.
            <br />
            <b>R</b> is correct! The third letter is <b>R</b>
            .<br />
            <b>D</b> occurs <em>elsewhere</em> in the target word.
          </p>
          <p>
            Let's move the <b>D</b> in our next guess:
            <Row
              rowState={RowState.LockedIn}
              wordLength={4}
              cluedLetters={[
                { clue: Clue.Correct, letter: "d" },
                { clue: Clue.Correct, letter: "a" },
                { clue: Clue.Correct, letter: "r" },
                { clue: Clue.Absent, letter: "k" },
              ]}
            />
            So close!
            <Row
              rowState={RowState.LockedIn}
              wordLength={4}
              cluedLetters={[
                { clue: Clue.Correct, letter: "d" },
                { clue: Clue.Correct, letter: "a" },
                { clue: Clue.Correct, letter: "r" },
                { clue: Clue.Correct, letter: "t" },
              ]}
            />
          </p> */}
        </div>
      )}
      <Game maxGuesses={maxGuesses} hidden={settings} />
    </div>
  </div>
  );
}

export default App;
