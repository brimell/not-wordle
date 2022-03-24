import wordList from "../../Wordlist/wordList.json";
import nonFiveWords from "../../Wordlist/common.json";
import { seed } from "../util";
import { clue } from "./clue";
// import { gsap, Power3 } from "gsap";
// import $ from "jquery";
import { useContext } from "react";
import { MainContext } from "./../../context/context";

export function onKey(props) {
	const {
		key,
		startNextGame,
		handleGameFinish,
		gameState,
		setGameState,
		guesses,
		setGuesses,
		setCurrentGuess,
		currentGuess,
		setHint,
		maxGuesses,
		multiplayerGrid,
		setMultiplayerGrid,
		socket,
		target,
		propsTarget,
		currGrid,
		wordLength,
		hardmode,
		messagesIsOpen,
	} = props;
	if (messagesIsOpen) {
		return;
	}
	if (gameState !== "Playing") {
		if (key === "enter" && !socket) {
			startNextGame();
		}
		return;
	}
	// if game has started
	if (guesses.length === maxGuesses) return;
	if (/^[a-z]$/.test(key)) {
		setCurrentGuess((guess) => (guess + key).slice(0, wordLength));
		setHint("");
	} else if (key === "backspace") {
		setCurrentGuess((guess) => guess.slice(0, -1));
		setHint("");
	} else if (key === "enter") {
		//? check invalids
		if (currentGuess.length !== wordLength) {
			setHint("Too short");
			return;
		}
		if (wordLength === 5) {
			if (!wordList.includes(currentGuess)) {
				setHint("Not a valid word");
				return;
			}
		} else {
			if (!nonFiveWords.includes(currentGuess)) {
				setHint("Not a valid word");
				return;
			}
		}
		var clueList = [];
		for (let i = 0; i < guesses.length; i++) {
			clueList.push(clue(guesses[i], target));
		}

		function checkHardmode() {
			//? returns true if not valid hardmode word

			var wrong_columns = []; // a list of where letter can't be for hard mode
			var correct_list = []; // a list of where letters have to be
			for (let i = 0; i < wordLength; i++) {
				// initialise columns
				wrong_columns.push([]);
				correct_list.push("");
			}

			for (let i = 0; i < clueList.length; i++) {
				for (let j = 0; j < clueList[i].length; j++) {
					const letter = clueList[i][j];
					if (letter.clue == "absent") {
						for (let y = 0; y < wordLength; y++) {
							wrong_columns[y].push(letter.letter); // letter is not anywhere
						}
					} else if (letter.clue === "elsewhere") {
						wrong_columns[j].push(letter.letter); // letter is not in that position
					} else if (letter.clue === "correct") {
						correct_list[j] = letter.letter;
					}
				}
			}
			//? checks for hardmode invalidation
			for (let i = 0; i < currentGuess.length; i++) {
				for (let j = 0; j < wrong_columns[i].length; j++) {
					// check if letter is in wrong place
					if (currentGuess[i] === wrong_columns[i][j]) {
						return true;
					}
				}
				// check if a correct letter is in wrong place
				if (correct_list[i] && currentGuess[i] !== correct_list[i]) {
					return true;
				}
			}
			return false;
		}
		if (hardmode && checkHardmode()) {
			setHint("Not a valid word as you are in hard mode");
			return;
		}

		//? guess logic - passed checks
		setGuesses((guesses) => guesses.concat([currentGuess]));
		setCurrentGuess((guess) => "");
		// lockInAnim();
		if (socket && multiplayerGrid !== currGrid) {
			setMultiplayerGrid(currGrid);
		}
		if (currentGuess === target) {
			setGameState("Won");
			updateStats(true, wordLength, guesses.length);
			if (propsTarget) {
				handleGameFinish("Won");
			} else if (props.timed) {
				setHint("You got the word! Press enter to continue");
			} else {
				setHint("You won! (Enter to play again)");
			}
		} else if (guesses.length + 1 === maxGuesses) {
			setGameState("Lost");
			updateStats(false, wordLength, guesses.length);

			if (propsTarget) {
				handleGameFinish("Lost");
			} else {
				setHint(
					`You lost! The answer was ${target.toUpperCase()}. (Enter to play again)`
				);
			}
		} else {
			setHint("");
		}
	}
}

async function lockInAnim() {
	// const tl = gsap.timeline({ defaults: { ease: Power3.easeOut } });
	const ease = Power3.easeOut;
	const lockedRow = $(".Row-locked-in");
	if (lockedRow.length > 0) {
		const lockedInLetters = lockedRow[lockedRow.length - 1].children;
		for (let i = 0; i < lockedInLetters.length; i++) {
			console.log(lockedInLetters);
			var letterClass = lockedInLetters[i].className.replace(
				"Row-letter ",
				""
			);
			$(lockedInLetters[i]).removeClass(letterClass);
			gsap.from(lockedInLetters[i], {
				rotationX: "180",
				duration: 1,
				delay: i * 0.1,
				onComplete: reAddClass,
				onCompleteParams: [letterClass, lockedInLetters[i]],
				ease,
			});
		}
	}
	function reAddClass(letterClass, letter) {
		$(letter).addClass(letterClass);
	}
}

function invalidAnim() {}

export function updateStats(gameState, wordLength, guesses) {
	// console.log(guesses)
	guesses++;
	const today = new Date();
	var yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	var yesterday_string = yesterday
		.toISOString()
		.slice(0, 10)
		.replaceAll("-", "");

	const stats = JSON.parse(localStorage.getItem("stats") || "{}");
	if (!stats[wordLength]) {
		stats[wordLength] = {
			games: 0,
			wins: 0,
			losses: 0,
			guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
		};
	}

	if (!stats["last_played"]) {
		stats["streak"] = 1;
	} else if (yesterday_string === stats["last_played"]) {
		stats["streak"]++;
	}
	if (gameState) {
		stats[wordLength].wins += 1;
	} else {
		stats[wordLength].losses++;
	}
	if (Number.isInteger(stats[wordLength].guesses)) {
		stats[wordLength].guesses = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
	}
	if (!stats[wordLength].guesses[guesses]) {
		stats[wordLength].guesses[guesses] = 1;
	} else {
		stats[wordLength].guesses[guesses]++;
	}
	stats["last_played"] = new Date()
		.toISOString()
		.replace(/-/g, "")
		.slice(0, 8);
	stats[wordLength].games++;
	localStorage.setItem("stats", JSON.stringify(stats));
}
