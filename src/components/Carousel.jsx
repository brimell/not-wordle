import { useContext } from "react";
import { MainContext } from "../context/context";

export default function Carousel(props) {
	const rooms = props.rooms;

	return (
		<div className="carousel">
			{rooms.map((room, i) => {
				if (room.gameState.toLowerCase() === "lobby") {
					return (
						<Item key={`slide-${i}`} room={room} joinable={true} />
					);
				} else {
					return (
						<Item key={`slide-${i}`} room={room} joinable={false} />
					);
				}
			})}
		</div>
	);
}

function Item(props) {
	const { socket, setLobby, name } = useContext(MainContext);
	const room = props.room;
	const joinable = props.joinable;
	return (
		<article className="information card">
			<span className="tag">Host: {room.host}</span>
			<span className="subtitle">Room Code:</span>
			<h2 className="title" id="roomCode" >{room.room}</h2>
			{/* 
			uncomment to show player list in server browser
			<span className="subtitle">Players List:</span>
			{room.users.map((user, j) => {
				return (
					<p key={j} className="info">
						{user}
					</p>
				);
			})} */}
			{joinable && (
				<button
					className="button"
					onClick={() => {
						socket.emit("fetchUserListByRoom", room.room);
						socket.on("fetchUserListByRoomRes", (users) => {
							var dupe = false;
							if (users.length > 0) {
								for (var i = 0; i < users.length; i++) {
									var user = users[i];
									if (user === name) {
										alert(
											"that name is taken in this room"
										);
										dupe = true;
										return;
									}
								}
							}
							if (name.length > 2 && !dupe) {
								socket.emit("joinRoom", {
									name: name,
									room: room.room,
									role: "user",
								});
								socket.on("joinRoomRes", (props) => {
									if (props.res === true) {
										setLobby(true);
									} else {
										alert("that name is taken");
									}
								});
							} else {
								alert("name must be at least 3 characters");
							}
						});
					}}
				>
					<span>Join Room</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="none"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path
							d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"
							fill="currentColor"
						/>
					</svg>
				</button>
			)}
			<dl className="details">
				<div>
					<dt>Players</dt>
					<dd>{room.users.length}</dd>
				</div>
				<div>
					<dt>State</dt>
					<dd>{room.gameState}</dd>
				</div>
			</dl>
		</article>
	);
}
