import wordList from "../../Wordlist/wordList.json";
import nonFiveWords from "../../Wordlist/common.json";
import { seed } from "../util";


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

	function disableTodaysWord() {
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
	if (gameState !== "Playing") {
		console.log("game is not playing");
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

		//? guess logic
		setGuesses((guesses) => guesses.concat([currentGuess]));
		setCurrentGuess((guess) => "");
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
					disableTodaysWord();
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
					disableTodaysWord();
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