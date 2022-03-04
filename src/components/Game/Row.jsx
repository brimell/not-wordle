import { useRef, useEffect } from "react";
import { clueClass } from "./clue";
import { gsap } from "gsap";

export function Row(props) {
	const isLockedIn = props.rowState === "LockedIn";
	const letterDivs = props.cluedLetters
		.concat(Array(props.wordLength).fill({ clue: "absent", letter: "" }))
		.slice(0, props.wordLength)
		.map(({ clue, letter }, i) => {
			let letterRef = useRef();
			if (isLockedIn && clue !== undefined) {
				gsap.to(letterRef.current, { rotationX: "360", duration: 1 });
				console.log("test");
			}

			let letterClass = "Row-letter";
			if (isLockedIn && clue !== undefined) {
				letterClass += " " + clueClass(clue);
			}
			return (
				<div key={i} ref={letterRef} className={letterClass}>
					{letter}
				</div>
			);
		});
	let rowClass = "Row";
	if (isLockedIn) rowClass += " Row-locked-in";
	return <div className={rowClass}>{letterDivs}</div>;
}
