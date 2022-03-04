import { clueClass } from "./clue";
import { gsap } from "gsap";
import $ from "jquery";
export function Row(props) {
	// function lockInAnim(clue, letter) { // atempt at animation WIP
	// 	let tl = gsap.timeline();
	// 	if (refs_list) {
	// 		Object.keys(refs_list).forEach((i) => {
	// 			tl.to(refs_list[i].current, {
	// 				rotationX: "360",
	// 				duration: 1,
	// 				onComplete: () => {
	// 					console.log(letter);
	// 					if (letter.current.parentElement.classList.contains("Row-locked-in")) {
	// 						$("." + letter.current.className).addClass(
	// 							clueClass(clue)
	// 						);
	// 					}
	// 				},
	// 			});
	// 		});
	// 	}
	// }

	const isLockedIn = props.rowState === "LockedIn";
	const letterDivs = props.cluedLetters
		.concat(Array(props.wordLength).fill({ clue: "absent", letter: "" }))
		.slice(0, props.wordLength)
		.map(({ clue, letter }, i) => {
			let letterClass = "Row-letter";

			if (isLockedIn && clue !== undefined) {
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
