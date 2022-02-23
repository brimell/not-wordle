import React, { useEffect, useState } from "react";

export default function Login(props) {
	const name = props.name;
	const setName = props.setName;

	useEffect(() => {
		if (name !== "") {
			localStorage.setItem("name", name);
		}
	}, [name]);

	function handleNameChange(event) {
		setName(event.target.value);
	}

	return (
		<div className="loginContainer">
			<input
				id="name-input"
				className="neumorphic-input"
				type="text"
				placeholder="Name..."
				value={name}
				onChange={handleNameChange}
			></input>
		</div>
	);
}
