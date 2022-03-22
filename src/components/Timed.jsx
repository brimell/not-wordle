import Game from "./Game/Game";
import { useEffect, useState, useContext } from "react";
import { MainContext } from "./../context/context";
import { useTimer } from "react-timer-hook";

export default function Timed() {
	const [currentGrid, setCurrentGrid] = useState([]);
	const expiryTimestamp = Date.now() + 60000;

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
		onExpire: timerFinish,
		expiryTimestamp,
		onExpire: () => console.warn("onExpire called"),
	});
	function timerFinish() {
		// do stuff
	}
	function restartTimer() {
		// restarts to 5 minute timer
		const time = new Date();
		time.setSeconds(time.getSeconds() + 300);
		restart(time);
	}

	function handleGameFinish(gameState) {
		return;
	}

	useEffect(() => {
		if (currentGrid.length > 0) {
			if (currentGrid[0].length > 0 && !isRunning) {
				start()
			}
		}
		console.log(currentGrid);
	}, [currentGrid]);

	return (
		<div className="GameContainer">
			<Timer minutes={minutes} seconds={seconds} />
			<Game
				target={false}
				socket={false}
				setCurrentGrid={setCurrentGrid}
				handleGameFinish={handleGameFinish}
			/>
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
