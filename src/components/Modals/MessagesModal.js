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

	function ChatRoom() {
		useEffect(() => {
			dummy.current.scrollIntoView({ behavior: "smooth" });
		});
		const dummy = useRef();
		const messagesRef = firestore.collection("messages");
		const query = messagesRef.orderBy("createdAt", "desc").limit(25)

		const [messages] = useCollectionData(query, { idField: "id" });
		// const messagesCopy = messages
		// messagesCopy.sort((a, b, c) => (a.createdAt > b.createdAt > c.createdAt) ? 1 : -1)

		console.log('messages: ',messages)
		const [formValue, setFormValue] = useState("");

		const sendMessage = async (e) => {
			e.preventDefault();

			await messagesRef.add({
				text: formValue,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				user: name === "" ? "Anonymous" : name,
			});

			setFormValue("");
			dummy.current.scrollIntoView({ behavior: "smooth" });
		};

		function ChatMessage(props) {
			const { text, user } = props.message;

			const messageClass =
				user === (name === "" ? "Anonymous" : name)
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

		return (
			<>
				<main id="messages">
					{messages &&
						messages.map((msg) => (
							<ChatMessage key={msg.id} message={msg} />
						))}

					<span id="dummy" ref={dummy}></span>
				</main>

				<form onSubmit={sendMessage}>
					<input
						value={formValue}
						onChange={(e) => setFormValue(e.target.value)}
						placeholder="say something nice"
					/>

					<button type="submit" disabled={!formValue}>
						🕊️
					</button>
				</form>
			</>
		);
	}
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
