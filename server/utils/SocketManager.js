const wordList = require("./wordList.json");

const makeRandom = () => Math.random();
let random = makeRandom();
function resetRng() {
	random = makeRandom();
}
function pick(array) {
	resetRng();
	return array[Math.floor(array.length * random)];
}
const targets = wordList.slice(0, 20000); // adjust for max target freakiness
function randomTarget(wordLength) {
	const eligible = targets.filter((word) => word.length === wordLength);
	return pick(eligible);
}

const SocketManager = (socket, io, utils) => {
	console.log("New connection: ", socket.id);

	function checkDuplicateName(name, room) {
		let dupe = false;
		for (let username in utils.getUserList(room)) {
			if (username === name) {
				io.to(socket.id).emit("joinRoomRes", { res: false });
				dupe = true;
			}
		}
		return dupe; // return true if name is taken
	}

	socket.on("joinRoom", (props) => {
		if (!checkDuplicateName(props.name, props.room)) {
			if (props.role === "host") {
				utils.newRoom(props.room, props.name);
			}
			
			utils.removeUser(socket.id);
			utils.addUser(socket.id, props.name, props.room, props.role);

			socket.join(props.room);

			io.to(props.room).emit(
				"updateUsersList",
				utils.getUserList(props.room)
			);
			io.to(socket.id).emit("joinRoomRes", { res: true });
			socket.broadcast.emit("updateRooms", utils.getRoomList());
		}
		// console.log(users.getRoomList())
	});

	socket.on("gameFinish", (gameState) => {
		const user = utils.getUser(socket.id);
		if (gameState === "Won") {
			utils.updateGameState(user.room, "Podium");
			io.to(user.room).emit("gameWon", user.id);
			io.to(user.room).emit("updateRooms", utils.getRoomList());
		} else if (gameState === "Lost") {
			utils.userLost(user.id);
			io.to(user.room).emit("gameLost", user.id);
			if (
				utils.getLostCount(user.room) ===
				utils.getUserList(user.room).length
			) {
				utils.updateGameState(user.room, "Podium");
				io.to(user.room).emit("updateRooms", utils.getRoomList());
				io.to(user.room).emit("allLost");
			}
		}
	});

	socket.on("start-game", (props) => {
		const user = utils.getUser(socket.id);
		if (utils.getUser(socket.id).role === "host") {
			console.log("game started in room: ", user.room);
			resetRng();
			io.to(user.room).emit("game-started", {
				res: true,
				target: randomTarget(5),
			});
			utils.updateGameState(user.room, "playing");
			socket.broadcast.emit("updateRooms", utils.getRoomList());
		} else {
			io.to(user.room).emit("game-started", { res: false });
		}
	});

	socket.on("playAgain", () => {
		const user = utils.getUser(socket.id);
		io.to(user.room).emit("playAgainRes");
	});

	socket.on("fetchRooms", () => {
		var room_list = utils.getRoomList();
		io.to(socket.id).emit("fetchRoomsRes", room_list);
	});

	socket.on("fetchFullUsersList", (props) => {
		const user = utils.getUser(socket.id);
		if (user) {
			io.to(user.room).emit(
				"updateFullUsersList",
				utils.getFullUserList(user.room)
			);
		}
	});
	socket.on("fetchUserListByRoom", (room) => {
		io.to(socket.id).emit(
			"fetchUserListByRoomRes",
			utils.getUserList(room)
		);
	});
	socket.on("fetchUserList", (props) => {
		const user = utils.getUser(socket.id);
		if (user && props) {
			io.to(socket.id).emit(
				"updateUsersList",
				utils.getUserList(user.room)
			);
		} else if (user) {
			io.to(user.room).emit(
				"updateUsersList",
				utils.getUserList(user.room)
			);
		}
	});

	socket.on("getUser", (id) => {
		const user = utils.getUser(id);
		if (user) {
			io.to(socket.id).emit("getUserRes", user);
		}
	});

	socket.on("getAllUsers", (props) => {
		console.log("test");
		const all_users = utils.getAllUsers();
		io.to(socket.id).emit("getAllUsersRes", all_users);
	});

	socket.on("update-grid", (grid) => {
		const user = utils.getUser(socket.id);
		if (user) {
			utils.updateGrid(user.id, grid);
			console.log("grids: ", utils.getGrids(user.room));
			io.to(user.room).emit(
				"update-grid-client",
				utils.getGrids(user.room)
			);
		} else {
			console.log("user not found: ", socket.id, grid, utils);
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
		let user = utils.removeUser(socket.id);

		if (user) {
			utils.removeRoom(user.room);
			io.to(user.room).emit(
				"updateUsersList",
				utils.getUserList(user.room)
			);
			socket.leave(user.room);
			socket.broadcast.emit("updateRooms", utils.getRoomList());
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
		let user = utils.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit(
				"updateUsersList",
				utils.getUserList(user.room)
			);
			if (
				utils
					.getRoomList(user.room)
					.filter((room) => room.room === user.room).length === 1
			) {
				utils.removeRoom(user.room);
			}
			socket.broadcast.emit("updateRooms", utils.getRoomList());
		}
	});
};

module.exports = SocketManager;
