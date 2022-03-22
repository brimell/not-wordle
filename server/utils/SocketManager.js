const wordList = require("./wordList.json");
const messageManager = require("./messageManager.js");

const makeRandom = () => Math.random();
let random = makeRandom();
function resetRng() {
	random = makeRandom();
}
function pick(array) {
	resetRng();
	return array[Math.floor(array.length * random)];
}
const targets = wordList.slice(0, 2000); // adjust for max target freakiness
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
				//? check if room already exists
				for (room in utils.getRoomList()) {
					if (room.room === props.room) {
						io.to(socket.id).emit("joinRoomRes", { res: false });
						return;
					}
				}
				utils.newRoom(props.room, props.name);
				utils.removeUser(socket.id);
				utils.addUser(socket.id, props.name, props.room, props.role);

				socket.join(props.room);
			} else {
				utils.removeUser(socket.id);
				utils.addUser(socket.id, props.name, props.room, props.role);

				socket.join(props.room);
			}

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
		if (gameState === "Won" && user) {
			utils.updateGameState(user.room, "Podium");
			utils.setFinishTime(user.room)

			io.to(user.room).emit("gameWon", user.id);
			socket.emit("updateRooms", utils.getRoomList());
		} else if (gameState === "Lost" && user) {
			utils.userLost(user.id);
			io.to(user.room).emit("gameLost", user.id);
			if (
				utils.getLostCount(user.room) ===
				utils.getUserList(user.room).length
			) {
				utils.updateGameState(user.room, "Podium");
				
				socket.emit("updateRooms", utils.getRoomList());
				io.to(user.room).emit("allLost");
			}
		}
	});

	socket.on("updatePodiumTime", (time) => {
		const user = utils.getUser(socket.id);
		if (user) {
			io.to(user.room).emit("updatePodiumTimeAll", time);
		}
	})

	socket.on("start-game", (props) => {
		const user = utils.getUser(socket.id);
		if (utils.getUser(socket.id).role === "host") {
			console.log("game started in room: ", user.room);
			resetRng();
			utils.resetGrids(user.room);
			utils.resetLost(user.room);
			io.to(user.room).emit("game-started", {
				res: true,
				target: randomTarget(5),
				hardmode: props.hardmode,
			});
			utils.updateGameState(user.room, "playing");
			utils.setStartTime(user.room)
			socket.broadcast.emit("updateRooms", utils.getRoomList());
		} else {
			io.to(user.room).emit("game-started", { res: false });
		}
	});

	socket.on("playAgain", () => {
		const user = utils.getUser(socket.id);
		utils.updateGameState(user.room, "lobby");
		utils.resetRoom(user.room); // rests grids and lost count
		io.to(user.room).emit("playAgainRes");
		socket.broadcast.emit("updateRooms", utils.getRoomList());
	});

	socket.on("fetchRooms", () => {
		io.to(socket.id).emit("fetchRoomsRes", utils.getRoomList());
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
		const all_users = utils.getAllUsers();
		io.to(socket.id).emit("getAllUsersRes", all_users);
	});

	socket.on("update-grid", (grid) => {
		const user = utils.getUser(socket.id);
		if (user) {
			utils.updateGrid(user.id, grid);
			// console.log("grids: ", utils.getGrids(user.room));
			io.to(user.room).emit(
				"update-grid-client",
				utils.getGrids(user.room)
			);
		} else {
			console.log("user not found: ", socket.id, grid, utils);
		}
	});

	socket.on("leave-room", (props) => {
		const user = utils.removeUser(socket.id);

		if (user) {
			socket.leave(user.room);
			if (user.role === "host") {
				utils.updateHost(user.room);
			}

			io.to(user.room).emit(
				"updateUsersList",
				utils.getUserList(user.room)
			);
			io.to(user.room).emit(
				"updateFullUsersList",
				utils.getFullUserList(user.room)
			);
		} else {
			console.log("cannot leave room as user is: ", user);
		}
		//? check for empty rooms and remove them
		const roomList = utils.getRoomList();
		if (roomList.length !== 0) {
			for (let room in roomList) {
				if (roomList[room].users.length === 0) {
					utils.removeRoom(roomList[room].room);
				}
			}
		}

		socket.broadcast.emit("updateRooms", utils.getRoomList());
	});

	socket.on("disconnect", () => {
		let user = utils.removeUser(socket.id);

		if (user) {
			// if user is last user
			for (let room in utils.getRoomList()) {
				if (utils.getRoomList()[room].users.length === 0) {
					utils.removeRoom(utils.getRoomList()[room].room);
				}
			}
			io.to(user.room).emit(
				"updateUsersList",
				utils.getUserList(user.room)
			);
			socket.leave(user.room);
		} else {
			console.log("cannot leave room as user is: ", user);
			//? check for empty rooms and remove them
			for (let room in utils.getRoomList()) {
				if (utils.getRoomList()[room].users.length === 0) {
					utils.removeRoom(utils.getRoomList()[room].room);
				}
			}
		}

		socket.broadcast.emit("updateRooms", utils.getRoomList());
	});

	messageManager(socket, io, utils);
};

module.exports = SocketManager;

// voice chat
// socket.on("sending signal", (payload) => {
// 	io.to(payload.userToSignal).emit("user joined", {
// 		signal: payload.signal,
// 		callerID: payload.callerID,
// 	});
// });

// socket.on("returning signal", (payload) => {
// 	io.to(payload.callerID).emit("receiving returned signal", {
// 		signal: payload.signal,
// 		id: socket.id,
// 	});
// });

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
