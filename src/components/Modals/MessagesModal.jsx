import React, { useContext, useState, useRef, useEffect } from "react";
import { MainContext } from "../../context/context";
import "react-hooks-use-modal";
import { X } from "react-feather";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();

export default function StatsModal(props) {
	const {
		name,
		messagesModal,
		// messagesOpen,
		messagesClose,
		// messagesIsOpen,
	} = useContext(MainContext);

	const Modal = messagesModal;
	const close = messagesClose;
	return (
		<Modal>
			<div className="modalContainer">
				<X onClick={close} className="modalCloseIcon" />
				<div className="messagesContainer">
					<ChatRoom />
				</div>
			</div>
		</Modal>
	);
}

const sendMessage = async (
	e,
	formValue,
	name,
	dummy,
	messagesRef,
	setFormValue
) => {
	e.preventDefault();

	await messagesRef.add({
		text: formValue,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		user: name === "" ? "Anonymous" : name,
	});

	setFormValue("");
	dummy.current.scrollIntoView({ behavior: "smooth" });
};

function ChatRoom() {
	const { name } = useContext(MainContext);

	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	});
	const dummy = useRef();
	const messagesRef = firestore.collection("messages");

	const yesterday = new Date() - 86400; // todays date - 1 day in seconds
	const my_date = firebase.firestore.Timestamp.fromDate(new Date(yesterday));

	const query = messagesRef.orderBy("createdAt", "asc")
	// .where("createdAt", ">", my_date); // messages from the last day;
	const [messages] = useCollectionData(query, { idField: "id" });

	// console.log("messages: ", messages);
	// console.log("yesterday: ", yesterday);
	// console.log('today: ', String(new Date() - 1));

	return (
		<>
			<main id="messages">
				{messages &&
					messages.map((msg) => (
						<ChatMessage name={name} key={msg.id} message={msg} />
					))}

				<span id="dummy" ref={dummy}></span>
			</main>
			<ChatForm mRef={messagesRef} dummy={dummy} />
		</>
	);
}

function ChatForm(props) {
	const { name } = useContext(MainContext);
	const [formValue, setFormValue] = useState("");
	return (
		<form
			onSubmit={(e) => {
				sendMessage(
					e,
					formValue,
					name,
					props.dummy,
					props.mRef,
					setFormValue
				);
			}}
		>
			<input
				value={formValue}
				onChange={(e) => setFormValue(e.target.value)}
				placeholder="say something nice"
			/>

			<button type="submit" disabled={!formValue}>
				🕊️
			</button>
		</form>
	);
}

function ChatMessage(props) {
	const { text, user, createdAt } = props.message;

	const messageClass =
		user === (props.name === "" ? "Anonymous" : props.name)
			? "sent"
			: "received";

	return (
		<>
			<div className={`message ${messageClass}`} key={props.key}>
				<p>{text}</p>
			</div>
		</>
	);
}
