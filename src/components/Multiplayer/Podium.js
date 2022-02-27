import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../../context/context";

export default function Podium() {
	const { socket, grids, winner, target, setWordLength } =
		useContext(MainContext);

	setWordLength(localStorage.getItem("wordLength")); // set word length to previous value before multiplayer game
	const [guesses, setGuesses] = useState(0);

	useEffect(() => {
		if (winner && grids[winner]) {
			for (var i = 0; i < grids[winner].length; i++) {
				if (grids[winner][i].length !== 0) {
					setGuesses(i + 1);
				}
			}
		}
	}, [winner, grids]);

	return (
		<div className="podium">
			<p>
				<span className="wordHighlight">
					{winner ? winner : "loading..."}
				</span>{" "}
				got the word in <span className="wordHighlight">{guesses}</span>{" "}
				guesses!
			</p>
			<p>
				the word was: <span className="wordPrimary">{target}</span>
			</p>
			{grids &&
				winner &&
				Object.keys(grids).map((name, i) => {
					if (name === winner) {
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
		</div>
	);
}
