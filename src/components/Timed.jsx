import Game from "./Game/Game";
import { useEffect, useState, useContext } from "react";
import { MainContext } from "./../context/context";
import { useTimer } from "react-timer-hook";
import { timers } from "jquery";

export default function Timed() {
	const [currentGrid, setCurrentGrid] = useState([]);
	const [successfulGuesses, setSuccessfulGuesses] = useState([]);
	const [podium, setPodium] = useState(false);
	const timerLength = 10 * 1000;
	const expiryTimestamp = Date.now() + timerLength;

	const {
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		autoStart: false,
		expiryTimestamp,
		onExpire: timerFinish,
	});

	function timerFinish() {
		console.log("timer finish");
		setPodium(true);
	}
	function restartTimer() {
		// restarts to 5 minute timer
		setCurrentGrid([]);
		setSuccessfulGuesses([]);
		const expiryTimestamp = Date.now() + timerLength;
		restart(expiryTimestamp, false); // seconds arg is autostart bool
	}

	function handleGameFinish(gameState) {
		return;
	}

	function playAgain() {
		restartTimer();
		setPodium(false);
	}

	function updateTimedData(gameTarget, guesses) {
		let new_guesses = successfulGuesses;
		new_guesses.push(gameTarget);
		setSuccessfulGuesses(new_guesses);
	}

	useEffect(() => {
		if (currentGrid.length > 0) {
			if (currentGrid[0].length > 0 && !isRunning) {
				start();
			}
		}
	}, [currentGrid]);

	return (
		<div className="GameContainer">
			{!podium && (
				<>
					<Timer minutes={minutes} seconds={seconds} />
					<Game
						timed={true}
						updateTimedData={updateTimedData}
						target={false}
						socket={false}
						setCurrentGrid={setCurrentGrid}
						handleGameFinish={handleGameFinish}
					/>
				</>
			)}
			{podium && (
				<TimedPodium
					successfulGuesses={successfulGuesses}
					playAgain={playAgain}
					timerLength={timerLength}
				/>
			)}
		</div>
	);
}
function Timer(props) {
	const { minutes, seconds } = props;

	return (
		<div className="timer">
			<div>
				<span>{minutes}</span>:<span>{seconds}</span>
			</div>
		</div>
	);
}

function TimedPodium(props) {
	const { successfulGuesses, playAgain, timerLength } = props;
	return (
		<div className="timedPodium">
			<h2>
				you got{" "}
				<span className="wordHighlight">
					{successfulGuesses.length}
				</span>{" "}
				{successfulGuesses.length === 1 ? "word" : "words"} in{" "}
				<span className="wordPrimary">{timerLength / 1000}s</span>
			</h2>
			{successfulGuesses.length > 0 && (
				<div className="wordsList">
					<h2>Words Guessed:</h2>

					{successfulGuesses.map((word) => {
						return <p key={word}>{word}</p>;
					})}
				</div>
			)}
			<button className="primary" id="playAgainBtn" onClick={playAgain}>
				Play Again
			</button>
		</div>
	);
}
