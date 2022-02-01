import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Row, RowState } from "./Row";
import { Clue, clue } from "./clue";
import { Keyboard } from "./Keyboard";
import common from "../common.json";
import { pick, resetRng, seed } from "./util";
import $ from "jquery";
import { useModal } from 'react-hooks-use-modal';
import CloseIcon from '@mui/icons-material/Close';

enum GameState {
  Playing,
  Won,
  Lost,
}

interface GameProps {
  maxGuesses: number;
  hidden: boolean;
  setCurrentGrid: useState;
}

const targets = common
  .slice(0, 20000) // adjust for max target freakiness

function randomTarget(wordLength: number) {
  const eligible = targets.filter((word) => word.length === wordLength);
  return pick(eligible);
}

if (!localStorage.getItem("wordLength")) {
  localStorage.setItem("wordLength", "5");
}

function updateStats(gameState: boolean, wordLength: number, guesses: number) {
  // console.log(guesses)
  guesses ++
  const today = new Date()
  var yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  var yesterday_string = yesterday.toISOString().slice(0, 10).replaceAll('-','')

  const stats = JSON.parse(localStorage.getItem("stats") || "{}");
  if (!stats[wordLength]) {
    stats[wordLength] = {
      games: 0,
      wins: 0,
      losses: 0,
      guesses: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0},
    };
  }

  if (!stats['last_played']) {
    stats['streak'] = 1
  } else if (yesterday_string === stats['last_played']) {
    stats['streak'] ++
  }
  if (gameState) {
    stats[wordLength].wins += 1;
  } else {
    stats[wordLength].losses ++;
  }
  if (Number.isInteger(stats[wordLength].guesses)) {
    stats[wordLength].guesses = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}
  }
  if (!stats[wordLength].guesses[guesses]) {
    stats[wordLength].guesses[guesses] = 1;
  } else {
    stats[wordLength].guesses[guesses] ++
  }
  stats['last_played'] = new Date().toISOString().replace(/-/g, "").slice(0, 8)
  stats[wordLength].games++;
  localStorage.setItem("stats", JSON.stringify(stats));
  
}



function Game(props: GameProps) {
  const [gameState, setGameState] = useState(GameState.Playing);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [wordLength, setWordLength] = useState(parseInt(localStorage.getItem("wordLength") || "5"));
  const [hint, setHint] = useState<string>(`Make your first guess!`);
  const [target, setTarget] = useState(() => {
    resetRng();
    return randomTarget(wordLength);
  });
  const [gameNumber, setGameNumber] = useState(1);
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    // closeOnOverlayClick: false
  });
  const startNextGame = () => {
    setTarget(randomTarget(wordLength));
    setGuesses([]);
    setCurrentGuess("");
    setHint("");
    setGameState(GameState.Playing);
    setGameNumber((x) => x + 1);
  };

  function disableTodaysWord() {
    if (seed && localStorage.getItem("wordMode") === "todaysWord") {
      localStorage.setItem("wordMode", "randomWord");
      $('#todaysWord').addClass('is-outlined')
      $('#randomWord').removeClass('is-outlined')
      localStorage.setItem("todays_last_played", new Date().toISOString().replace(/-/g, "").slice(0, 8));
      open()
    }
    // set modal display to block
  }

  const onKey = (key: string) => {
    if (gameState !== GameState.Playing) {
      if (key === "Enter") {
        startNextGame();
      }
      return;
    }
    if (guesses.length === props.maxGuesses) return;
    if (/^[a-z]$/.test(key.toLowerCase())) {
      setCurrentGuess((guess) => (guess + key).slice(0, wordLength));
      setHint("");
    } else if (key === "Backspace") {
      setCurrentGuess((guess) => guess.slice(0, -1));
      setHint("");
    } else if (key === "Enter") {
      if (currentGuess.length !== wordLength) {
        setHint("Too short");
        return;
      }
      if (!common.includes(currentGuess)) {
        setHint("Not a valid word");
        return;
      }
      setGuesses((guesses) => guesses.concat([currentGuess]));
      setCurrentGuess((guess) => "");
      if (currentGuess === target) {
        if (seed) {
          disableTodaysWord()
          setHint("You won! (Enter to play a random word)");
        } else {
          setHint("You won! (Enter to play again)");
        }
        setGameState(GameState.Won);
        updateStats(true, wordLength, guesses.length);
      } else if (guesses.length + 1 === props.maxGuesses) {
        if (seed) {
          disableTodaysWord()
          setHint(`You lost! The answer was ${target.toUpperCase()}. (Enter to play a random word)`)
        } else {
          setHint(
            `You lost! The answer was ${target.toUpperCase()}. (Enter to play again)`
          );
        }
        setGameState(GameState.Lost);
        updateStats(false, wordLength, guesses.length);
      } else {
        setHint("");
      }
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) {
        onKey(e.key);
      }
      // console.log(target)
    };
    
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGuess, gameState]);

  let letterInfo = new Map<string, Clue>();
  const rowDivs = Array(props.maxGuesses)
    .fill(undefined)
    .map((_, i) => {
      const guess = [...guesses, currentGuess][i] ?? "";
      const cluedLetters = clue(guess, target);
      const lockedIn = i < guesses.length;
      if (lockedIn) {
        for (const { clue, letter } of cluedLetters) {
          if (clue === undefined) break;
          const old = letterInfo.get(letter);
          if (old === undefined || clue > old) {
            letterInfo.set(letter, clue);
          }
        }
      }
      return (
        <Row
          key={i}
          wordLength={wordLength}
          rowState={lockedIn ? RowState.LockedIn : RowState.Pending}
          cluedLetters={cluedLetters}
        />
      );
    });
    useEffect(() => {
      props.setCurrentGrid(rowDivs)
    })

    function resizeGrid() {
      if (window.screen.width <= 800) {
        if (String($('.Row').children().length / 6) === (localStorage.getItem('wordLength'))) {
          if (parseInt(localStorage.getItem('wordLength')!) <= 5) {
            $('.Row-letter').attr('style','width: 7vh')
          } else if (localStorage.getItem('wordLength')! === "6") {
            $('.Row-letter').attr('style','width: 6.8vh')
          } else if (localStorage.getItem('wordLength')! === "7") {
            $('.Row-letter').attr('style','width: 5.7vh')
          } else if (localStorage.getItem('wordLength')! === "8") {
            $('.Row-letter').attr('style','width: 5vh')
          }
        } else {
          setTimeout(resizeGrid, 100);
        }
      }
    }
    resizeGrid()
  return (
    <div className="Game" >
      <Modal>
        <div className="modalContainer">
          <CloseIcon onClick={close} className="modalCloseIcon" />
          <h1 className="statsHeader">{gameState === GameState.Won ? "Well Done!" : 'Nice Try!'}</h1>
          <p>{(gameState === GameState.Won ? "You have just completed todays word!" : "Unfortunately, you have failed todays word.") + "You can continue playing by closing out of this popup and pressing enter."}</p>
        </div>
      </Modal>
      <div className="Game-options" id="GameOptions" style={{display: window.screen.width <= 800 ? (props.hidden ? 'flex' : 'none') : 'flex'}}>
        <label htmlFor="wordLength">{wordLength} Letters:</label>
        <input
          className="slider"
          type="range"
          min="3"
          max="8"
          id="wordLength"
          disabled={
            gameState === GameState.Playing &&
            (guesses.length > 0 || currentGuess !== "")
          }
          value={wordLength}
          onChange={(e) => {
            const length = Number(e.target.value);
            resetRng();
            setGameNumber(1);
            setGameState(GameState.Playing);
            setGuesses([]);
            setTarget(randomTarget(length));
            setWordLength(length);
            setHint(`${length} letters`);
            (document.activeElement as HTMLElement)?.blur();
            (localStorage.setItem('wordLength', length.toString()) as any);
            resizeGrid();
          }}
        ></input>
        <button
          className="button is-primary is-outlined"
          style={{ flex: "0" }}
          disabled={gameState !== GameState.Playing || guesses.length === 0}
          onClick={async () => {
            async function getData() {
              const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${target}`)
              const data = await response.json()
              const definition = data[0].meanings[0].definitions[0].definition
              const example = data[0].meanings[0].definitions[0].example
              // return [definition, example] || ["none", "none"]
              console.log(definition)
              return definition
            }
            if (seed) {
              disableTodaysWord()
              setHint(
                `The answer was ${target.toUpperCase()}. Definition: ${await getData()} (Enter to play a random word)`
              );
            } else {
              setHint(
                `The answer was ${target.toUpperCase()}. Definition: ${await getData()} (Enter to play again)`
              );
            }
            
            setGameState(GameState.Lost);
            if (seed) {disableTodaysWord()}
            updateStats(false, wordLength, guesses.length);
            (document.activeElement as HTMLElement)?.blur();
          }}
        >
          Give up
        </button>
      </div>
      <div className="Game" id="gridKeyboardHint" style={{ display: props.hidden ? "none" : "block" }}>
      {rowDivs}
      <p id="hint" >{hint || `\u00a0`}</p> {/* no break space / nbsp */}
      <Keyboard letterInfo={letterInfo} onKey={onKey} />
      {seed ? (
        <div className="Game-seed-info">
          seed {seed}, length {wordLength}, game {gameNumber}
        </div>
      ) : undefined}
      </div>
      
    </div>
  );
}
export default Game;


