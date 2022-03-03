export function clue(guess, target) {
	var target_list = [];
	target.split("").forEach((letter, i) => {
		if (guess[i] !== letter) {
			target_list.push(letter);
		}
	});
	return guess.split("").map((letter, i) => {
		let j;
		if (target[i] === letter) {
			return { clue: "correct", letter: letter };
		} else if ((j = target_list.indexOf(letter)) > -1) {
			// "use it up" so we don't clue at it twice
			target_list[j] = "";
			return { clue: "elsewhere", letter };
		} else {
			return { clue: "absent", letter };
		}
	});
}

export function clueClass(clue) {
	if (clue === "absent") {
		return "letter-absent";
	} else if (clue === "elsewhere") {
		return "letter-elsewhere";
	} else {
		return "letter-correct";
	}
}
