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
					<ChatRoom
						messages={props.messages}
						setMessages={props.setMessages}
					/>
				</div>
			</div>
		</Modal>
	);
}

function ChatRoom(props) {
	const { messages, setMessages } = props;
	const { socket } = useContext(MainContext);
	const messagesRef = useRef();

	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	});
	const dummy = useRef();

	useEffect(() => {
		socket.emit("fetch-messages");

		socket.on("message-receive", (data) => {
			setMessages(data);
			dummy.current.scrollIntoView({ behavior: "smooth" });
		});
		socket.on("fetch-messages-res", (data) => {
			if (data.length > 0) {
				setMessages(data);
			}
		});
		return () => {
			socket.off("fetch-messages-res");
			socket.off("message-receive");
		};
	}, [socket]);

	// const yesterday = new Date() - 86400; // todays date - 1 day in seconds

	return (
		<>
			<main id="messages">
				{messages &&
					messages.map((msg, i) => (
						<ChatMessage message={msg} key={i} />
					))}

				<span id="dummy" ref={dummy}></span>
			</main>
			<MessageInput mRef={messagesRef} dummy={dummy} />
		</>
	);
}

function MessageInput(props) {
	const { name, socket } = useContext(MainContext);
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
					setFormValue,
					socket
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

function sendMessage(
	e,
	formValue,
	name,
	dummy,
	messagesRef,
	setFormValue,
	socket
) {
	e.preventDefault();

	const data = {
		message: formValue,
	};

	socket.emit("message-send", data);

	let date = new Date();
	let time = date.getHours() + ":" + date.getMinutes();

	setFormValue("");
	dummy.current.scrollIntoView({ behavior: "smooth" });
}

function ChatMessage(props) {
	const { name } = useContext(MainContext);
	const { message, room, time, user } = props.message;

	const messageClass = user.name === name ? "sent" : "received";

	return (
		<>
			<div className={`message ${messageClass}`}>
				<h4>{user.name}</h4>
				<p>{message}</p>
			</div>
		</>
	);
}
