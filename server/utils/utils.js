// data strcuture

// users

// [
// {
// id
// name
// room
// role
// lost
// grid
// }
// ]

// rooms

// [
// {
// room
// host
// users: [user1, user2]
// gameState
// lostCount
// grids
// }
// ]

class Users {
	constructor() {
		this.users = [];
		this.rooms = [];
	}

	addUser(id, name, room, role) {
		let user = { id, name, room, role, grid: [], lost: false };

		this.users.push(user);
		for (var i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === room) {
				this.rooms[i].users.push(name); // add user name to room
			}
		}

		return user;
	}

	newRoom(room, host) {
		this.rooms.push({
			room,
			host,
			users: [],
			gameState: "lobby",
			lostCount: 0,
			grids: {},
		});
	}

	getUserList(room) {
		let users = this.users.filter((user) => user.room === room);
		let namesArray = users.map((user) => user.name);

		return namesArray;
	}

	getAllUsers() {
		return this.users.map((user) => user.name);
	}

	getRoomList() {
		return this.rooms;
	}

	updateGameState(room, gameState) {
		for (var i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === room) {
				this.rooms[i].gameState = gameState;
			}
		}
	}

	updateHost(room) {
		for (var i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === room) {
				if (this.rooms[i].users.length > 0) {
					this.rooms[i].users[0].role = "host";
				}
			}
		}
	}

	removeRoom(roomprop) {
		this.rooms = this.rooms.filter((room) => room.room !== roomprop);
	}

	getLostCount(room) {
		//? get lost count
		let lostCount = 0;
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].room === room) {
				if (this.users[i].lost) {
					lostCount++;
				}
			}
		}
		//? update lost count
		for (i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === room) {
				this.rooms[i].lostCount = lostCount;
			}
		}

		return lostCount;
	}

	getFullUserList(room) {
		let users = this.users.filter((user) => user.room === room);
		return users;
	}

	getUser(id) {
		return this.users.filter((user) => user.id === id)[0];
	}

	userLost(id) {
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].id === id) {
				this.users[i].lost = true;
			}
		}
	}

	removeUser(id) {
		let user = this.getUser(id);

		if (user) {
			this.users = this.users.filter((user) => user.id !== id);
			for (var i = 0; i < this.rooms.length; i++) {
				if (this.rooms[i].room === user.room) {
					this.rooms[i].users = this.rooms[i].users.filter(
						(userprop) => userprop !== user.name
					);
				}
			}
		}

		return user;
	}

	updateGrid(id, grid) {
		// updates grid for user with id
		//? updates grid in user object
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].id === id) {
				this.users[i].grid = grid;
			}
		}
		//? updates grid in room object
		for (i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === this.getUser(id).room) {
				for (var user in Object.keys(this.rooms[i].grids)) {
					if (user === this.getUser(id).name) {
						this.rooms[i].grids[user] = grid;
					}
				}
			}
		}
	}

	getGrids(room) {
		var grids = {};
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].room === room) {
				grids[this.users[i].name] = this.users[i].grid;
			}
		}
		return grids;
	}
	resetGrids(room) {
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].room === room) {
				this.users[i].grid = [];
			}
		}
		for (i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === room) {
				this.rooms[i].grids = {};
			}
		}
	}
	resetLost(room) {
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].room === room) {
				this.users[i].lost = false;
			}
		}
		for (i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === room) {
				this.rooms[i].lostCount = 0;
			}
		}
	}
	resetRoom(room) {
		this.resetGrids(room);
		this.resetLost(room);
	}
	saveMessage(data) {
		for (var i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === data.room) {
				if (this.rooms[i].messages) {
					this.rooms[i].messages.push(data);
				} else {
					this.rooms[i].messages = [data];
				}
			}
		}
	}
	getMessages(room) {
		var messages = [];
		for (var i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === room) {
				if (this.rooms[i].messages) {
					messages = this.rooms[i].messages;
				} else {
					messages = [];
				}
			}
		}
		return messages;
	}
	setStartTime(room) {
		for (var i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === room) {
				this.rooms[i].startTime = new Date();
			}
		}
	}
	setFinishTime(room) {
		for (var i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === room) {
				this.rooms[i].finishTime = new Date();
			}
		}
	}
}

module.exports = {
	Users,
};
