import { Clue, clueClass } from "../Game/clue";
import "./keyboard.css";
import { useEffect } from "react";

export function Keyboard(props) {
  const hidden = props.hidden;
  const keyboard = [
    "q w e r t y u i o p".split(" "),
    "a s d f g h j k l".split(" "),
    "Enter z x c v b n m Backspace".split(" "),
  ];

  useEffect(() => {
    window.addEventListener("load", () => {
      const btn = document.querySelectorAll(".Game-keyboard-button");
      console.log("btn: ", btn);
      btn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          console.log(e)
          const letter = e.target.attributes['data-key'].value;
          console.log(letter)
          props.onKey(letter);
        });
      });
    });
  });

  return (
    <div className="Game-keyboard" style={{ display: props.hidden && "none" }}>
      {keyboard.map((row, i) => (
        <div key={i} className="Game-keyboard-row">
          {row.map((label, j) => {
            let className = "Game-keyboard-button";
            const clue = props.letterInfo.get(label);
            if (clue !== undefined) {
              className += " " + "keyboard-" + clueClass(clue);
            }
            if (label.length > 1) {
              className += " Game-keyboard-button-wide";
            }
            return (
              <button data-key={label} tabIndex={-1} key={j} className={className}>
                {label.replace("Backspace", "⌫")}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
