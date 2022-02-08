import { Clue, clueClass } from "../Game/clue";
import "./keyboard.css";
import { useEffect } from "react";
import $ from "jquery";

export function Keyboard(props) {
  const hidden = props.hidden;
  const onKey = props.onKey
  const keyboard = [
    "q w e r t y u i o p".split(" "),
    "a s d f g h j k l".split(" "),
    "Enter z x c v b n m Backspace".split(" "),
  ];
  function startListeners() {
    console.log('ran')
    $(".Game-keyboard-button").on("click", function (e) {
      const letter = e.target.attributes["data-key"].value;
      console.log(letter)
      onKey(letter);
    });
  }

  useEffect(() => {
    window.addEventListener('load', startListeners())
  },[]);

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
              <button
                data-key={label}
                tabIndex={-1}
                key={j}
                className={className}
              >
                {label.replace("Backspace", "⌫")}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
