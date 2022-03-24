/* eslint-disable react-hooks/exhaustive-deps */
import { clueClass } from "./Game/clue";
import { useEffect } from "react";
import $ from "jquery";
// import { gsap, Power3 } from "gsap";

export function Keyboard(props) {
	const { currentGuess, onKey } = props;
	var onKeyProps = props.onKeyProps;
	const keyboard = [
		"q w e r t y u i o p".split(" "),
		"a s d f g h j k l".split(" "),
		"Enter z x c v b n m Backspace".split(" "),
	];

	// useEffect(() => {
	// 	const ease = Power3.easeOut;
	// 	gsap.from(".Game-keyboard", { y: "50%", duration: 2, ease });
	// }, []);
	useEffect(() => {
		$(".Game-keyboard-button").on("click", (e) => {
			const letter = e.target.attributes["data-key"].value;
			onKeyProps.key = letter.toLowerCase();
			onKey(onKeyProps);
		});
		return () => $(".Game-keyboard-button").off();
	}, [currentGuess]);

	return (
		<div className="Game-keyboard">
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
								type="button"
								data-key={label}
								tabIndex={-1}
								key={j}
								className={className}
								// onClick={() => {
								//   onKeyProps.key = label.toLowerCase();
								//   // console.log(onKeyProps);
								//   onKey(onKeyProps);
								// }}
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
