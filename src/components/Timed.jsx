import Game from "./Game/Game";
import { useEffect, useState, useContext } from "react";
import { MainContext } from "./../context/context";

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
			<Timer seconds={seconds} setSeconds={setSeconds} timerState={timerState} setTimerState={setTimerState} />
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
	const [running, setRunning] = useState(false);

	useEffect(() => {
		if (props.timerState === "started") {
			startTimer();
			props.setTimerState("counting");
		}
		if (props.timerState === "stopped") {
			resetTimer();
		}
	}, [props.timerState]);

	useEffect(() => {
		console.log("seconds: ", props.seconds);
	}, [props.seconds]);

	function resetTimer() {
		// timer = 5
	}

	function startTimer() {
        var secondsInterval
		if (props.seconds > 0 && !running) {
			setRunning(true);
			secondsInterval = setInterval(countDown, 1000);
		}
        function countDown() { // gets run every second
            props.setSeconds(props.seconds - 1);
            console.log(props.seconds)
    
            // Check if we're at zero.
            if (props.seconds - 1 == 0) {
                setTimerState("stopped");
                clearInterval(secondsInterval)
            }
            setRunning(false);
        }
	}



	return <div>{props.seconds}</div>;
}
