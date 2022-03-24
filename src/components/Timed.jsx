import Game from "./Game/Game";
import { useEffect, useState, useContext } from "react";
import { MainContext } from "./../context/context";
import { useTimer } from "react-timer-hook";
import { timers } from "jquery";

export default function Timed() {
	const [currentGrid, setCurrentGrid] = useState([]);
	const [successfulGuesses, setSuccessfulGuesses] = useState();
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
		const time = new Date();
		time.setSeconds(time.getSeconds() + timerLength);
		restart(time);
	}

	function handleGameFinish(gameState) {
		return;
	}

	function playAgain() {
		restartTimer()
		setPodium(false)
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
			{podium && <TimedPodium />}
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

function TimedPodium() {
	return (
		<div className="timedPodium">
			<h2>
				you got{" "}
				<span className="wordHighlight">
					{successfulGuesses.length}
				</span>{" "}
				{successfulGuesses.length === 1 ? "guess" : "guesses"} in{" "}
				{timerLength/1000}s
			</h2>
			<div className="wordsList">
				{successfulGuesses.map((word) => {
					return (
						<>
							<span>{word}</span>
						</>
					);
				})}
			</div>
			<button className="primary" id="playAgainBtn" onClick={playAgain}>
				Play Again
			</button>
		</div>
	);
}
