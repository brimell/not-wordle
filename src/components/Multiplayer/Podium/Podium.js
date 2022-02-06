import React from "react";
import "./Podium.css";

export default function Podium(props) {
  const socket = props.socket;
  const target = props.target;
  const winner = props.winner;
  const grids = props.grids;

  var guesses = 0;
  for (var i = 0; i < grids[winner].length; i++) {
    if (grids[winner][i].length !== 0) {
      guesses++;
    }
  }
  return (
    <div className="podium">
      <p>
        <span className="wordHighlight">{winner}</span> got the word in {guesses} guesses!
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
                    <div className="gridRow" key={j}>
                      {row.map((letter, k) => {
                        return (
                          <div
                            className={`podiumGridLetter gridLetter letter-clue-${letter.clue}`}
                            key={k}
                          ></div>
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
