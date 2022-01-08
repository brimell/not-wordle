import "./App.css";
import common from "./common.json";
import { dictionarySet, pick, seed } from "./components/util";
import Game from "./components/Game";
import { Row, RowState } from "./components/Row";
import { Clue } from "./components/clue";

function App() {
  const maxGuesses = 6;
  return (
    <div className="App-container">
      <h1>not wordle</h1>
      <div className="GameContainer">
        <button
          className="button is-outlined is-primary"
          onClick={() =>
            (document.location = seed ? "/" : "?seed=" + new Date().toISOString().replace(/-/g, "").slice(0, 8))
          }
        >
          {seed ? "Random" : "Today's"}
        </button>
      <Game maxGuesses={maxGuesses} />
    </div>
  </div>
  );
}

export default App;
