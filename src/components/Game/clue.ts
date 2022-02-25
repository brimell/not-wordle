export function clue(word, target): CluedLetter[] {
	let elusive: string[] = [];
	target.split("").forEach((letter, i) => {
		if (word[i] !== letter) {
			elusive.push(letter);
		}
	});
	return word.split("").map((letter, i) => {
		let j: number;
		if (target[i] === letter) {
			return { clue: Clue.Correct, letter };
		} else if ((j = elusive.indexOf(letter)) > -1) {
			// "use it up" so we don't clue at it twice
			elusive[j] = "";
			return { clue: Clue.Elsewhere, letter };
		} else {
			return { clue: Clue.Absent, letter };
		}
	});
}

export function clueClass(clue: Clue): string {
	if (clue === Clue.Absent) {
		return "letter-absent";
	} else if (clue === Clue.Elsewhere) {
		return "letter-elsewhere";
	} else {
		return "letter-correct";
	}
}
