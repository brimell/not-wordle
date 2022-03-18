import React, { useContext, useState, useRef, useEffect } from "react";
import { MainContext } from "../../context/context";
import "react-hooks-use-modal";
import { X } from "react-feather";

export default function StatsModal(props) {
	const {
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

async function sendMessage(
	e,
	formValue,
	name,
	dummy,
	messagesRef,
	setFormValue
) {
	e.preventDefault();
	const { socket } = useContext(MainContext);

	data = {
		text: formValue,
		user: name === "" ? "Anonymous" : name,
	};

	socket.emit("message-send", data);

	let date = new Date();
	let time = date.getHours() + ":" + date.getMinutes();

	await messagesRef.add({
		text: formValue,
		time,
		user: name === "" ? "Anonymous" : name,
	});

	setFormValue("");
	dummy.current.scrollIntoView({ behavior: "smooth" });
}

function ChatRoom() {
	const { name, socket } = useContext(MainContext);
	const [messages, setMessages] = useState([]);
	const messagesRef = useRef();
	useEffect(() => {
		socket.emit("fetch-messages");
		socket.on("fetch-messages-res", (data) => {
			setMessages(data);
		});
		return () => {
			socket.off("fetchMessages");
		};
	}, []);

	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	});
	const dummy = useRef();

	useEffect(() => {
		socket.on("message-receive", (props) => {
			messagesRef.add({
				text: props.message,
				time: props.time,
				user: props.user,
			});
			dummy.current.scrollIntoView({ behavior: "smooth" });
		});
	});

	// const yesterday = new Date() - 86400; // todays date - 1 day in seconds

	return (
		<>
			<main id="messages">
				{messages &&
					messages.map((msg) => (
						<ChatMessage message={msg} key={msg.time} />
					))}

				<span id="dummy" ref={dummy}></span>
			</main>
			<MessageInput mRef={messagesRef} dummy={dummy} />
		</>
	);
}

function MessageInput(props) {
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
	const { text, user, time } = props.message;

	const messageClass =
		user === (props.name === "" ? "Anonymous" : props.name)
			? "sent"
			: "received";

	return (
		<>
			<div className={`message ${messageClass}`} key={time}>
				<p>{text}</p>
			</div>
		</>
	);
}
