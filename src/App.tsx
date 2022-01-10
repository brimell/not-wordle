import "./App.css";
// import common from "./common.json";
import { seed } from "./components/util";
import Game from "./components/Game";
import { useState, useEffect } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { useModal } from 'react-hooks-use-modal';
import $ from 'jquery'

if (!localStorage.getItem("wordMode")) {localStorage.setItem("wordMode", "todaysWord")}

function App() {
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    // closeOnOverlayClick: false
  });
  const [settings, setSettings] = useState(false);
  const maxGuesses = 6;
  useEffect(() => { // makes sure the code only gets run once
    if (localStorage.getItem("wordMode") === "todaysWord") {
      sessionStorage.setItem('seed',new Date().toISOString().replace(/-/g, "").slice(0, 8)) 
      
    }
  }, []);
  var stats = JSON.parse(localStorage.getItem("stats") || '{}') || 'No Stats Yet...'
  var wordLength = localStorage.getItem("wordLength")
  var totalgames = 0
  var totalwins = 0
  var totallosses = 0
  var guessesArray = []
  for (var key in stats) {
    if (parseInt(key)) {
      totalgames += stats[key].games
      totalwins += stats[key].wins
      totallosses += stats[key].losses

      for (var key2 in stats[key].guesses) {
        for (var i = 0; i < stats[key].guesses[key2]; i++) {
          guessesArray.push(key2)
        }
      }
    }
  }
  
  console.log(guessesArray)
  let sum = 0;
  for (let i = 0; i < guessesArray.length; i++) {
      sum += parseInt(guessesArray[i]);
  }
  var averageGuesses = Math.round(sum / guessesArray.length)

  return (
    <div className="App-container">
      <Modal>
        <div className="modalContainer">
          <CloseIcon onClick={close} className="modalCloseIcon" />
          <h1 className="statsHeader">Stats</h1>
          <p>{'total games: ' + totalgames}</p>
          <p>{'total wins: ' + totalwins}</p>
          <p>{'total losses: ' + totallosses}</p>
          <p>{'average guesses: ' + averageGuesses}</p>
          <br />
          <h1 className="statsHeader">{wordLength + " Letter Stats"}</h1>
          {stats[wordLength!] ? <p>{'1: ' + stats[wordLength!].guesses['1']}</p> : null}
          {stats[wordLength!] ? <p>{'2: ' + stats[wordLength!].guesses['2']}</p> : null}
          {stats[wordLength!] ? <p>{'3: ' + stats[wordLength!].guesses['3']}</p> : null}
          {stats[wordLength!] ? <p>{'4: ' + stats[wordLength!].guesses['4']}</p> : null}
          {stats[wordLength!] ? <p>{'5: ' + stats[wordLength!].guesses['5']}</p> : null}
          {stats[wordLength!] ? <p>{'6: ' + stats[wordLength!].guesses['6']}</p> : null}          
        </div>
      </Modal>
      <h1>not wordle</h1>
      <div className="settingsIcon">
        <button id="settingsButton" onClick={() => {
          setSettings((a) => !a)
          settings ?  document.getElementById('GameOptions')!.style.display = 'none' : document.getElementById('GameOptions')!.style.display = 'flex'
          }}>
          {settings ? < CloseIcon fontSize={$(window).height()! > 510 ? "large" : "small"} /> : <SettingsIcon fontSize={$(window).height()! > 510 ? "large" : "small"} /> }
        </button>
      </div>
      <div className="personIcon">
        <button id="personButton" onClick={open}>
          <PersonIcon fontSize={$(window).height()! > 510 ? "large" : "small"} />
        </button>
      </div>
      <div className="GameContainer">
        
        {settings && (
        <div className="App-settings">
          <p>You can change this from a random word to having a different word per day using these buttons</p>
          <div className="settingsContainer">
            <button
            className={ seed ? 'button is-primary' : 'button is-primary is-outlined'}
            id="todaysWord"
            onClick={() => {
              sessionStorage.setItem('seed',new Date().toISOString().replace(/-/g, "").slice(0, 8))
              localStorage.setItem("wordMode", "todaysWord")
              $('#todaysWord').removeClass('is-outlined')
              $('#randomWord').addClass('is-outlined')
            }
              
            }
          >
            Today's Word
          </button>
          <button
            className={ seed ? 'button is-primary is-outlined' : 'button is-primary'}
            id="randomWord"
            onClick={() => {
              sessionStorage.setItem('seed', 'false')
              localStorage.setItem("wordMode", "randomWord")
              $('#todaysWord').addClass('is-outlined')
              $('#randomWord').removeClass('is-outlined')
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
