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
// users
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
				this.rooms[i].users.push(user); // add user to room
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

	updateGameState(roomprop, gameState) {
		for (var i = 0; i < this.rooms.length; i++) {
			if (this.rooms[i].room === roomprop) {
				this.rooms[i].gameState = gameState;
			}
		}
	}

	removeRoom(roomprop) {
		this.rooms = this.rooms.filter((room) => room.room !== roomprop);
	}

	getLostCount(room) {
		let lostCount = 0;
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].room === room) {
				if (this.users[i].lost) {
					lostCount++;
				}
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
			this.rooms = this.rooms.filter((room) => room.room !== user.room);
		}

		return user;
	}

	updateGrid(id, grid) {
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].id === id) {
				this.users[i].grid = grid;
			}
		}
	}

	getGrids(room) {
		this.grids = {};
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].room === room) {
				this.grids[this.users[i].name] = this.users[i].grid;
			}
		}
		return this.grids;
	}
}

module.exports = {
	Users,
};
