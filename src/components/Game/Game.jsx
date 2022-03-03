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
import { GameOptions } from "./GameOptions";
import { GameFinishedModalComponent } from "./GameFinishedModal";

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
	const { maxGuesses, settings, wordLength, setWordLength } =
		useContext(MainContext);
	var currGrid = [];
	const socket = props.socket || null;
	const [gameState, setGameState] = useState("Playing");
	const [guesses, setGuesses] = useState([]);
	const [currentGuess, setCurrentGuess] = useState("");

	const [hint, setHint] = useState(`Make your first guess!`);
	const [target, setTarget] = useState(() => {
		if (props.target !== false) {
			return props.target;
		} else {
			resetRng();
			return randomTarget(wordLength);
		}
	});
	const [gameNumber, setGameNumber] = useState(1);
	const [
		GameFinishedModal,
		GameFinishedOpen,
		GameFinishedClose,
		GameFinishedIsOpen,
	] = useModal("root", {
		preventScroll: true,
		// closeOnOverlayClick: false
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
					target,
					propsTarget: props.target,
					currGrid,
					GameFinishedOpen,
					wordLength,
				};
				onKey(propsObj);
			}
			if (socket) {
				props.setCurrentGrid(currGrid);
			}
			// console.log("target: ", target);
		};

		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentGuess, gameState]);

	function startNextGame() {
		setTarget(randomTarget(wordLength));
		setGuesses([]);
		setCurrentGuess("");
		setHint("");
		setGameState("Playing");
		setGameNumber((x) => x + 1);
	}

	function handleGameFinish(gameState) {
		console.log("game finished with state: ", gameState);
		props.handleGameFinish(gameState);
	}

	let letterInfo = new Map();
	const rowDivs = Array(maxGuesses)
		.fill(undefined)
		.map((_, i) => {
			const guess = [...guesses, currentGuess][i] ?? "";
			const cluedLetters = clue(guess, target);
			currGrid.push(cluedLetters);
			const lockedIn = i < guesses.length;
			if (lockedIn) {
				for (const { clue, letter } of cluedLetters) {
					if (clue === undefined) break;
					const old = letterInfo.get(letter);
					if (old === undefined || clue > old) {
						letterInfo.set(letter, clue);
					}
				}
			}
			return (
				<Row
					key={i}
					wordLength={wordLength}
					rowState={lockedIn ? "LockedIn" : "Pending"}
					cluedLetters={cluedLetters}
				/>
			);
		});

	resizeGrid();

	const gameOptionsProps = {
		gameState,
		guesses,
		currentGuess,
	}

	return (
		<div className="Game">
			<GameFinishedModalComponent
				GameFinishedModal={GameFinishedModal}
				GameFinishedClose={GameFinishedClose}
				gameState={gameState}
			/>
			{!props.target && <GameOptions {...gameOptionsProps} />}
			{!settings && (
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
			)}
			{seed && !props.target && (
				<div className="Game-seed-info">
					seed {seed}, length {wordLength}, game {gameNumber}
				</div>
			)}
			<Keyboard
				currentGuess={currentGuess}
				hidden={settings}
				letterInfo={letterInfo}
				onKey={onKey}
			/>
		</div>
	);
}
export default Game;