import wordList from "../../Wordlist/wordList.json";
import nonFiveWords from "../../Wordlist/common.json";
import { seed } from "../util";
import { clue } from "./clue";
// import { gsap, Power3 } from "gsap";
// import $ from "jquery";

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
		GameFinishedOpen,
		wordLength,
	} = props;

	if (gameState !== "Playing") {
		if (
			key === "enter" &&
			!socket &&
			!window.location.href.endsWith("timed")
		) {
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
		var clueList = []
		for (let i = 0; i < guesses.length; i++) {
			clueList.push(clue(guesses[i],target))
		}
		
		for (let i = 0; i < guesses.length; i++) {
			for (let j = 0; j < guesses[i].length; j++) {
				const letter = guesses[i][j];
			}
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
			} else {
				if (seed) {
					disableTodaysWord(GameFinishedOpen);
					setHint("You won! (Enter to play a random word)");
				} else {
					setHint("You won! (Enter to play again)");
				}
			}
		} else if (guesses.length + 1 === maxGuesses) {
			setGameState("Lost");
			updateStats(false, wordLength, guesses.length);

			if (propsTarget) {
				handleGameFinish("Lost");
			} else {
				if (seed) {
					disableTodaysWord(GameFinishedOpen);
					setHint(
						`You lost! The answer was ${target.toUpperCase()}. (Enter to play a random word)`
					);
				} else {
					setHint(
						`You lost! The answer was ${target.toUpperCase()}. (Enter to play again)`
					);
				}
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

export function disableTodaysWord(GameFinishedOpen) {
	if (seed && localStorage.getItem("wordMode") === "todaysWord") {
		localStorage.setItem("wordMode", "randomWord");
		$("#todaysWord").addClass("is-outlined");
		$("#randomWord").removeClass("is-outlined");
		localStorage.setItem(
			"todays_last_played",
			new Date().toISOString().replace(/-/g, "").slice(0, 8)
		);
		GameFinishedOpen();
	}
	// set modal display to block
}
