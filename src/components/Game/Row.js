import { clueClass } from "./clue";

export function Row(props) {
	const isLockedIn = props.rowState === "LockedIn";
	console.log("cluedletters", props.cluedLetters);
	const letterDivs = props.cluedLetters
		.concat(Array(props.wordLength).fill({ clue: "Absent", letter: "" }))
		.slice(0, props.wordLength)
		.map(({ clue, letter }, i) => {
			let letterClass = "Row-letter";
			if (isLockedIn && clue !== undefined) {
				console.log("clue, letter: ", clue, letter);
				letterClass += " " + clueClass(clue);
			}
			return (
				<div key={i} className={letterClass}>
					{letter}
				</div>
			);
		});
	let rowClass = "Row";
	if (isLockedIn) rowClass += " Row-locked-in";
	return <div className={rowClass}>{letterDivs}</div>;
}
