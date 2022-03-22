import Game from "./Game/Game";
import { useEffect, useState, useContext } from "react";
import { MainContext } from "./../context/context";
import { useTimer } from "react-timer-hook";

export default function Timed() {
	const [currentGrid, setCurrentGrid] = useState([]);
	const [timerState, setTimerState] = useState("stopped");
	const [seconds, setSeconds] = useState(5);

	function handleGameFinish(gameState) {
		return;
	}

	useEffect(() => {
		if (currentGrid.length > 0) {
			if (currentGrid[0].length > 0 && timerState === "stopped") {
				setTimerState("started");
			}
		}
		console.log(currentGrid);
	}, [currentGrid]);

	return (
		<div className="GameContainer">
			<Timer expiryTimestamp={Date.now() + 60000} />
			,
			<Game
				target={false}
				socket={false}
				setCurrentGrid={setCurrentGrid}
				handleGameFinish={handleGameFinish}
			/>
		</div>
	);
}
function Timer({ expiryTimestamp }) {
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
		expiryTimestamp,
		onExpire: () => console.warn("onExpire called"),
	});

	function restartTimer() {
		// restarts to 5 minute timer
		const time = new Date();
		time.setSeconds(time.getSeconds() + 300);
		restart(time);
	}

	return (
		<div style={{ textAlign: "center" }}>
			<h1>react-timer-hook </h1>
			<p>Timer Demo</p>
			<div>
				<span>{minutes}</span>:<span>{seconds}</span>
			</div>
			<p>{isRunning ? "Running" : "Not running"}</p>
		</div>
	);
}
