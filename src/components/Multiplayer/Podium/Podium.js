import React, { useEffect, useState } from "react";
import "./Podium.css";

export default function Podium(props) {
  const socket = props.socket;
  const target = props.target;
  const winner = props.winner;
  const grids = props.grids;
  const [guesses, setGuesses] = useState(0)

  for (var i = 0; i < grids[winner].length; i++) {
    if (grids[winner][i].length !== 0) {
      guesses++;
    }
  }

  const classNameDict = {
      0: "letter-absent",
      1: "letter-elsewhere",
      2: "letter-correct"
  }

  return (
    <div className="podium">
      <p>
        <span className="wordHighlight">{winner}</span> got the word in <span className="wordHighlight">{guesses}</span> guesses!
      </p>
      <p>
        the word was: <span className="wordHighlight">{target}</span>
      </p>
      {grids &&
        Object.keys(grids).map((name, i) => {
          if (name === winner) {
            return (
              <div className="gridItem podiumGridItem" key={i}>
                {grids[name].map((row, j) => {
                  return (
                    <div className="Row" key={j}>
                      {row.map((letter, k) => {
                        return (
                          <div
                            className={`podiumGridLetter Row-letter ${classNameDict[letter.clue]}`}
                            key={k}
                          >{letter.letter}</div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          } else {
            return ''
          }
        })}
    </div>
  );
}
