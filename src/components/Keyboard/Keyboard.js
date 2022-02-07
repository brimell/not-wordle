import { Clue, clueClass } from "../Game/clue";

export function Keyboard(props) {
  const hidden = props.hidden
  const keyboard = [
    "q w e r t y u i o p".split(" "),
    "a s d f g h j k l".split(" "),
    "Enter z x c v b n m Backspace".split(" "),
  ];
 
  return (
    <div className="Game-keyboard" style={{ display: props.hidden && "none"}}>
      {keyboard.map((row, i) => (
        <div key={i} className="Game-keyboard-row">
          {row.map((label, j) => {
            let className = "Game-keyboard-button";
            const clue = props.letterInfo.get(label);
            if (clue !== undefined) {
              className += " " + clueClass(clue);
            }
            if (label.length > 1) {
              className += " Game-keyboard-button-wide";
            }
            return (
              <button
                tabIndex={-1}
                key={j}
                className={className}
                onClick={() => {
                  props.onKey(label);
                }}
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
