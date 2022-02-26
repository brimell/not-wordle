export function clue(guess, target) {
	console.log("word: ", guess, target);
	var target_list = [];
	target.split("").forEach((letter, i) => {
		if (guess[i] !== letter) {
			target_list.push(letter);
		}
	});
	return guess.split("").map((letter, i) => {
		let j;
		if (target[i] === letter) {
			return { clue: "Correct", letter: letter };
		} else if ((j = target_list.indexOf(letter)) > -1) {
			// "use it up" so we don't clue at it twice
			target_list[j] = "";
			return { clue: "Elsewhere", letter };
		} else {
			return { clue: "Absent", letter };
		}
	});
}

export function clueClass(clue) {
	if (clue === "Absent") {
		return "letter-absent";
	} else if (clue === "Elsewhere") {
		return "letter-elsewhere";
	} else {
		return "letter-correct";
	}
}
