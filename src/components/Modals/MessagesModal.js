import React, { useEffect, useState, useRef } from "react";
import "react-hooks-use-modal";
import { X, ArrowLeft, ArrowRight } from "react-feather";
import $ from "jquery";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();

export default function StatsModal(props) {
	const Modal = props.modal;
	const close = props.close;
	const socket = props.socket;
	const isOpen = props.isOpen;
	const game = props.game;
	const grids = props.grids;
	const name = props.name;

	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt").limit(25);

	const [messages] = useCollectionData(query, { idField: "id" });

	const [formValue, setFormValue] = useState("");

	function ChatRoom() {
		const dummy = useRef();
		const messagesRef = firestore.collection("messages");
		const query = messagesRef.orderBy("createdAt").limit(25);

		const [messages] = useCollectionData(query, { idField: "id" });

		const [formValue, setFormValue] = useState("");

		const sendMessage = async (e) => {
			e.preventDefault();

			await messagesRef.add({
				text: formValue,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				user: name,
			});

			setFormValue("");
			dummy.current.scrollIntoView({ behavior: "smooth" });
		};

    function ChatMessage(props) {
      const { text, username } = props.message;
    
      const messageClass = username === name ? 'sent' : 'received';
    
      return (<>
        <div className={`message ${messageClass}`}>
          <p>{text}</p>
        </div>
      </>)
    }

		return (
			<>
				<main>
					{messages &&
						messages.map((msg) => (
							<ChatMessage key={msg.id} message={msg} />
						))}

					<span ref={dummy}></span>
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
				<div className="messagesContainer"><ChatRoom /></div>
			</div>
		</Modal>
	);
}
