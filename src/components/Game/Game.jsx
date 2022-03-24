import { onKey } from "./onKey";
import { resizeGrid } from "./resizeGrid";
import { useEffect, useState, useContext } from "react";
import { Row } from "./Row";
import { clue } from "./clue";
import { Keyboard } from "../Keyboard";
import nonFiveWords from "../../Wordlist/common.json";
import wordList from "../../Wordlist/wordList.json";
import { pick, resetRng, seed } from "../util";
import { useModal } from "react-hooks-use-modal";
import { MainContext } from "../../context/context";

const targets = wordList.slice(0, 2000); // adjust for max target freakiness
const notFiveTargets = nonFiveWords.slice(0, 20000);

function randomTarget(wordLength) {
	var eligible;
	if (wordLength === 5) {
		eligible = targets.filter((word) => word.length === wordLength);
	} else {
		eligible = notFiveTargets.filter((word) => word.length === wordLength);
	}
	return pick(eligible);
}

if (!localStorage.getItem("wordLength")) {
	localStorage.setItem("wordLength", "5");
}

function Game(props) {
	const { maxGuesses, wordLength, setWordLength, messagesIsOpen } =
		useContext(MainContext);
	useEffect(() => {
		if (wordLength < 3) {
			setWordLength(5);
		}
	});
	var currGrid = [];
	const socket = props.socket || null;
	const [gameState, setGameState] = useState("Playing");
	const [guesses, setGuesses] = useState([]);
	const [currentGuess, setCurrentGuess] = useState("");

	const [hint, setHint] = useState(`Make your first guess!`);
	const [gameTarget, setGameTarget] = useState(() => {
		if (props.target !== false) {
			return props.target;
		} else {
			resetRng();
			return randomTarget(wordLength);
		}
	});

	useEffect(() => {
		setCurrentGuess(currentGuess.toLowerCase());
	}, [currentGuess]);

	useEffect(() => {
		const onKeyDown = (e) => {
			if (!e.ctrlKey && !e.metaKey) {
				const propsObj = {
					key: e.key.toLowerCase(),
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
					multiplayerGrid: props.multiplayerGrid,
					setMultiplayerGrid: props.setMultiplayerGrid,
					socket: props.socket,
					target: gameTarget,
					propsTarget: props.target,
					currGrid,
					wordLength,
					hardmode: props.hardmode,
					messagesIsOpen,
				};
				onKey(propsObj);
			}
			if (socket || window.location.href.endsWith("timed")) {
				props.setCurrentGrid(currGrid);
			}
			// console.log("target: ", gameTarget);
		};

		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentGuess, gameState]);

	// useEffect(() => {
	// 	const tiles = $(".Row-letter");
	// 	const tl = gsap.timeline({ defaults: { ease: Power3.easeOut } });
	// 	tl.staggerFrom(tiles, 0.5, { y: "-100%", opacity: 0 }, 0.1);
	// },[])

	function startNextGame() {
		if (props.timed) {
			props.updateTimedData(gameTarget, guesses);
		}
		setGameTarget(randomTarget(wordLength));
		setGuesses([]);
		setCurrentGuess("");
		setHint("");
		setGameState("Playing");
	}

	function handleGameFinish(gameState) {
		// console.log("game finished with state: ", gameState);
		props.handleGameFinish(gameState);
	}

	let letterInfo = new Map();
	const rowDivs = Array(maxGuesses)
		.fill(undefined)
		.map((_, i) => {
			const guess = [...guesses, currentGuess][i] ?? "";
			const cluedLetters = clue(guess, gameTarget);
			currGrid.push(cluedLetters);
			const lockedIn = i < guesses.length;
			if (lockedIn) {
				// sets letterinfo for keyboard
				for (const { clue, letter } of cluedLetters) {
					if (clue === undefined) break;
					const old = letterInfo.get(letter);
					if (old === undefined || clue > old) {
						letterInfo.set(letter, clue);
					}
				}
			}
			return (
				// returns rows for grid
				<Row
					key={i}
					wordLength={wordLength}
					rowState={lockedIn ? "LockedIn" : "Pending"}
					cluedLetters={cluedLetters}
				/>
			);
		});

	resizeGrid();

	const onKeyProps = {
		key: "",
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
		multiplayerGrid: props.multiplayerGrid,
		setMultiplayerGrid: props.setMultiplayerGrid,
		socket: props.socket,
		target: gameTarget,
		propsTarget: props.target,
		currGrid,
		wordLength,
		hardmode: props.hardmode,
		messagesIsOpen,
	};

	return (
		<>
			<div
				className={`Game ${
					Boolean(localStorage.getItem("partytime"))
						? "glow-card"
						: ""
				}`}
				id="gridKeyboardHint"
			>
				{rowDivs}
				<p id="hint">{hint || `\u00a0`}</p>{" "}
				{/* no break space / nbsp */}
			</div>
			<Keyboard
				currentGuess={currentGuess}
				letterInfo={letterInfo}
				onKey={onKey}
				onKeyProps={onKeyProps}
			/>
		</>
	);
}
export default Game;
