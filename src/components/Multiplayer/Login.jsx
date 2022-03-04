import React, { useEffect, useContext } from "react";
import { MainContext } from "../../context/context";

export default function Login(props) {
	const { socket, name, setName } = useContext(MainContext);
	const setLogin = props.setLogin;

	useEffect(() => {
		if (name !== "") {
			localStorage.setItem("name", name);
		}
	}, [name]);

	function handleNameChange(event) {
		setName(event.target.value);
	}

	function submitName() {
		socket.emit("getAllUsers");
		socket.on("getAllUsersRes", (users) => {
			var dupe = false;
			if (users.length > 0) {
				for (var i = 0; i < users.length; i++) {
					var user = users[i];
					if (user === name) {
						alert("that name is taken");
						dupe = true;
						return;
					}
				}
			}
			console.log("users: ", users);
			if (name.length > 2 && !dupe) {
				setLogin(false);
			}
			socket.off("getAllUsersRes"); // needs to be inside the socket.on
		});
	}

	useEffect(() => {
		function onKeyDown(e) {
			const key = e.key.toLowerCase();
			if (key === "enter") {
				submitName();
			}
		}

		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	});

	return (
		<div className="loginContainer">
			<input
				id="name-input"
				type="text"
				placeholder="Name..."
				value={name}
				onChange={handleNameChange}
			></input>
			<button
				type="button"
				className="primary nameSubmit"
				onClick={submitName}
			>
				Submit
			</button>
		</div>
	);
}
