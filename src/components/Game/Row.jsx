import { useRef, useEffect } from "react";
import { clueClass } from "./clue";
import { gsap } from "gsap";
import $ from "jquery";
export function Row(props) {
	var refs_list = {}; // list of refs of each locked in letter

	function lockInAnim(clue, letterClass) {
		let tl = gsap.timeline();
		if (refs_list) {
			Object.keys(refs_list).forEach((i) => {
				tl.to(refs_list[i].current, {
					rotationX: "360",
					duration: 1,
					onComplete: () => {
						letterClass += " " + clueClass(clue);
					},
				});
			});
		}
		return letterClass;
	}

	const isLockedIn = props.rowState === "LockedIn";
	const letterDivs = props.cluedLetters
		.concat(Array(props.wordLength).fill({ clue: "absent", letter: "" }))
		.slice(0, props.wordLength)
		.map(({ clue, letter }, i) => {
			refs_list[i] = useRef();

			let letterClass = "Row-letter";

			if (isLockedIn && clue !== undefined) {
				var thisClass = refs_list[i].current.className
				$('.' + thisClass) = lockInAnim(clue, letterClass);
			}

			return (
				<div key={i} ref={refs_list[i]} className={letterClass}>
					{letter}
				</div>
			);
		});
	let rowClass = "Row";
	if (isLockedIn) rowClass += " Row-locked-in";
	return <div className={rowClass}>{letterDivs}</div>;
}
