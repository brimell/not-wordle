const common = require("./common.json");

const makeRandom = () => Math.random();
let random = makeRandom();
function resetRng() {
	random = makeRandom();
}
function pick(array) {
	resetRng();
	return array[Math.floor(array.length * random)];
}
const targets = common.slice(0, 20000); // adjust for max target freakiness
function randomTarget(wordLength) {
	const eligible = targets.filter((word) => word.length === wordLength);
	return pick(eligible);
}

const SocketManager = (socket, io, users) => {
	console.log("new connection", socket.id);

	socket.on("joinRoom", (props) => {
		let dupe = false;
		for (let username in users.getUserList(props.room)) {
			if (username === props.name) {
				io.to(socket.id).emit("joinRoomRes", { res: false });
				dupe = true;
			}
		}
		if (!dupe) {
			socket.join(props.room);
			users.removeUser(socket.id);
			users.addUser(socket.id, props.name, props.room, props.role);

			io.to(props.room).emit(
				"updateUsersList",
				users.getUserList(props.room)
			);
			io.to(socket.id).emit("joinRoomRes", { res: true });
			if (props.role === "host") {
				console.log("was host");
				users.updateGameState(props.room, "lobby");
			} else {
				io.to(socket.id).emit(
					"all users",
					users.getUserList(props.room)
				); // for voice call
			}
			socket.broadcast.emit("updateRooms", users.getRoomList());
		}
		// console.log(users.getRoomList())
	});

	socket.on("gameFinish", (gameState) => {
		const user = users.getUser(socket.id);
		if (gameState === "Won") {
			io.to(user.room).emit("gameWon", user.id);
			users.updateGameState(user.room, "Podium");
			io.to(user.room).emit("updateRooms", users.getRoomList());
		} else if (gameState === "Lost") {
			users.userLost(user.id);
			io.to(user.room).emit("gameLost", user.id);
			if (
				users.getLostCount(user.room) ===
				users.getUserList(user.room).length
			) {
				users.updateGameState(user.room, "Podium");
				io.to(user.room).emit("updateRooms", users.getRoomList());
				io.to(user.room).emit("allLost");
			}
		}
	});

	socket.on("start-game", (props) => {
		const user = users.getUser(socket.id);
		if (users.getUser(socket.id).role === "host") {
			console.log("game started in room: ", user.room);

			io.to(user.room).emit("game-started", {
				res: true,
				target: randomTarget(5),
			});
			users.updateGameState(user.room, "playing");
			socket.broadcast.emit("updateRooms", users.getRoomList());
		} else {
			io.to(user.room).emit("game-started", { res: false });
		}
	});

	socket.on("fetchRooms", () => {
		var room_list = users.getRoomList();
		io.to(socket.id).emit("fetchRoomsRes", room_list);
	});

	socket.on("fetchFullUsersList", (props) => {
		const user = users.getUser(socket.id);
		if (user) {
			io.to(user.room).emit(
				"updateFullUsersList",
				users.getFullUserList(user.room)
			);
		}
	});
	socket.on("fetchUserListByRoom", (room) => {
		io.to(socket.id).emit(
			"fetchUserListByRoomRes",
			users.getUserList(room)
		);
	});
	socket.on("fetchUserList", (props) => {
		const user = users.getUser(socket.id);
		if (user && props) {
			io.to(socket.id).emit(
				"updateUsersList",
				users.getUserList(user.room)
			);
		} else if (user) {
			io.to(user.room).emit(
				"updateUsersList",
				users.getUserList(user.room)
			);
		}
	});

	socket.on("getUser", (id) => {
		const user = users.getUser(id);
		if (user) {
			io.to(socket.id).emit("getUserRes", user);
		}
	});

	socket.on("getAllUsers", (props) => {
		console.log("test");
		const all_users = users.getAllUsers();
		io.to(socket.id).emit("getAllUsersRes", all_users);
	});

	socket.on("update-grid", (grid) => {
		const user = users.getUser(socket.id);
		if (user) {
			users.updateGrid(user.id, grid);
			console.log("grids: ", users.getGrids(user.room));
			io.to(user.room).emit(
				"update-grid-client",
				users.getGrids(user.room)
			);
		} else {
			console.log("user not found: ", socket.id, grid, users);
		}
	});

	// socket.on('getGrids', () => {
	//   const user = users.getUser(socket.id);
	// 	if (user) {
	// 		users.getGrids(user.room);
	// 		socket.broadcast
	// 			.to(user.room)
	// 			.emit("update-grid-client", users.getGrids(user.room));
	// 	} else {
	// 		console.log("user not found: ", socket.id, grid, users);
	// 	}
	// })

	socket.on("leave-room", (props) => {
		let user = users.removeUser(socket.id);

		if (user) {
			users.removeRoom(user.room);
			io.to(user.room).emit(
				"updateUsersList",
				users.getUserList(user.room)
			);
			socket.leave(user.room);
			socket.broadcast.emit("updateRooms", users.getRoomList());
		} else {
			console.log("cannot leave room as user is: ", user);
		}
	});

	// voice chat
	socket.on("sending signal", (payload) => {
		io.to(payload.userToSignal).emit("user joined", {
			signal: payload.signal,
			callerID: payload.callerID,
		});
	});

	socket.on("returning signal", (payload) => {
		io.to(payload.callerID).emit("receiving returned signal", {
			signal: payload.signal,
			id: socket.id,
		});
	});

	socket.on("disconnect", () => {
		let user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit(
				"updateUsersList",
				users.getUserList(user.room)
			);
			if (
				users
					.getRoomList(user.room)
					.filter((room) => room.room === user.room).length === 1
			) {
				users.removeRoom(user.room);
			}
			socket.broadcast.emit("updateRooms", users.getRoomList());
		}
	});
};

module.exports = SocketManager;
