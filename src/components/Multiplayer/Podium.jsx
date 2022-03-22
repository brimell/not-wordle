import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../../context/context";
import axios from "axios";

export default function Podium(props) {
	const {
		setLobby,
		setPodium,
		socket,
		isHost,
		grids,
		setGrids,
		winner,
		target,
		setWordLength,
		setWinner,
	} = useContext(MainContext);

	useEffect(() => {
		setWordLength(localStorage.getItem("wordLength")); // set word length to previous value before multiplayer game
	});
	const [guesses, setGuesses] = useState(0);
	const [definition, setDefinition] = useState("Loading...");

	useEffect(() => {
		if (winner && grids[winner]) {
			for (var i = 0; i < grids[winner].length; i++) {
				if (grids[winner][i].length !== 0) {
					setGuesses(i + 1);
				}
			}
		}
	}, [winner, grids]);


	useEffect(() => {
		function onKeyDown(e) {
			if (e.key === "Enter" && isHost) {
				playAgain()
			}
		}
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	function playAgain() {
		socket.emit("playAgain");
	}
	//? need to be inside useEffect otherwise will be rendered multiple times and multiple listeners will be added
	useEffect(() => {
		socket.on("playAgainRes", () => {
			setGrids({});
			setLobby(true);
			setPodium(false);
			setWinner(false);
			props.setMultiplayerGrid([]);
		});
		return () => {
			socket.off("playAgainRes");
		};
	}, [setGrids, setLobby, setPodium, socket]);

	async function getDefinition(target) {
		axios
			.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${target}`)
			.then((res) => {
				const data = res.data;

				if (data.title === "No Definitions Found") {
					return "No definition found";
				} else if (data[0] !== undefined) {
					const def = data[0].meanings[0].definitions[0].definition;
					const example = data[0].meanings[0].definitions[0].example;
					// return [definition, example] || ["none", "none"]
					console.log("def: ", def);
					setDefinition(def);
					return def;
				}
			});
	}

	useEffect(() => {
		getDefinition(target);
	}, [target]);

	return (
		<div className="podium">
			{winner && (
				<p>
					<span className="wordHighlight">{winner}</span> got the word
					in <span className="wordHighlight">{guesses}</span> guesses!
				</p>
			)}
			{!winner && (
				<p>
					<span className="wordHighlight">No one</span> got the word!
				</p>
			)}
			<p>
				the word was: <span className="wordPrimary">{target}</span>
			</p>
			<p
				style={{
					maxWidth: "70%",
					lineHeight: "normal",
					fontSize: "20px",
					margin: 0,
				}}
			>{`Definition: ${String(definition).slice(0, 50)}${
				definition.length > 50 ? "..." : ""
			}`}</p>
			{grids &&
				winner &&
				Object.keys(grids).map((name, i) => {
					if (name === winner) {
						// renders winner grid
						return (
							<div className="gridItem podiumGridItem" key={i}>
								{grids[name].map((row, j) => {
									return (
										<div className="Row" key={j}>
											{row.map((letter, k) => {
												return (
													<div
														className={`podiumGridLetter Row-letter letter-${letter.clue}`}
														key={k}
													>
														{letter.letter}
													</div>
												);
											})}
										</div>
									);
								})}
							</div>
						);
					} else {
						return "";
					}
				})}
			{isHost && (
				<button
					className="primary"
					id="playAgainBtn"
					onClick={playAgain}
				>
					Play Again
				</button>
			)}
		</div>
	);
}
