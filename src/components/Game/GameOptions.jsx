import { MainContext } from "./../../context/context";
import { seed } from "../util";
import { useContext } from "react";

export function GameOptions(props) {
	const { settings, wordLength, setWordLength, target } =
		useContext(MainContext);

	const { gameState, guesses, currentGuess } = props;

	return (
		<div
			className="Game-options"
			id="GameOptions"
			style={{
				display:
					window.screen.width <= 800
						? settings
							? "flex"
							: "none"
						: "flex",
			}}
		>
			<label htmlFor="wordLength">{wordLength} Letters:</label>
			<input
				className="slider"
				type="range"
				min="3"
				max="8"
				id="wordLength"
				disabled={
					gameState === "Playing" &&
					(guesses.length > 0 || currentGuess !== "")
				}
				value={wordLength}
				onChange={(e) => {
					const length = Number(e.target.value);
					resetRng();
					setGameNumber(1);
					setGameState("Playing");
					setGuesses([]);
					setTarget(randomTarget(length));
					setWordLength(length);
					setHint(`${length} letters`);
					document.activeElement?.blur();
					localStorage.setItem("wordLength", length.toString());
					resizeGrid();
				}}
			></input>
			<button
				className="button primary"
				style={{
					flex: "0",
				}}
				disabled={gameState !== "Playing" || guesses.length === 0}
				onClick={async () => {
					if (seed) {
						disableTodaysWord();
						setHint(
							`The answer was ${target.toUpperCase()}. (Enter to play a random word)`
						);
					} else {
						setHint(
							`The answer was ${target.toUpperCase()}. (Enter to play again)`
						);
					}

					async function getData() {
						const response = await fetch(
							`https://api.dictionaryapi.dev/api/v2/entries/en/${target}`
						);
						const data = await response.json();

						if (data[0] !== undefined) {
							const definition =
								data[0].meanings[0].definitions[0].definition;
							const example =
								data[0].meanings[0].definitions[0].example; // return [definition, example] || ["none", "none"]

							console.log(definition);
							return definition;
						}
					}

					if (seed) {
						disableTodaysWord();
						setHint(
							`The answer was ${target.toUpperCase()}. Definition: ${await getData()} (Enter to play a random word)`
						);
					} else {
						setHint(
							`The answer was ${target.toUpperCase()}. Definition: ${await getData()} (Enter to play again)`
						);
					}

					setGameState("Lost");

					if (seed) {
						disableTodaysWord();
					}

					updateStats(false, wordLength, guesses.length);
					document.activeElement?.blur();
				}}
			>
				Give up
			</button>
		</div>
	);
}
