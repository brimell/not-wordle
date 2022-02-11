class Users {
  constructor() {
    this.users = [];
    this.rooms = [];
    this.grids = {};
  }

  addUser(id, name, room, role) {
    let user = { id, name, room, role };
    this.users.push(user);
    return user;
  }

  getUserList(room) {
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);

    return namesArray;
  }

  getRoomList() {
    var tempRooms = [];
    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i];
      if (this.rooms.length !== 0) {
        for (var j = 0; j < this.rooms.length; j++) {
          if (this.rooms[j].room === user.room && user.role === "host") {
            tempRooms.push({
              room: user.room,
              host: user.name,
              users: this.getUserList(user.room),
              gameState: this.rooms[j].gameState || "lobby",
            });
          }
        }
      } else {
        if (user.role === "host") {
          tempRooms.push({
            room: user.room,
            host: user.name,
            users: this.getUserList(user.room),
            gameState: "lobby",
          });
        }
      }
    }
    this.rooms = tempRooms;
    console.log(this.rooms);
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

  getFullUserList(room) {
    let users = this.users.filter((user) => user.room === room);
    return users;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  removeUser(id) {
    let user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
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
