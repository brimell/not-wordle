class Users {
  constructor() {
    this.users = [];
    this.rooms = [];
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
    this.rooms = []
    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i];
      if (user.role === "host") {
        this.rooms.push({
          room: user.room,
          host: user.name,
          users: this.getUserList(user.room),
        });
      }
    }
    console.log(this.rooms)
    return this.rooms;
  }

  updateGameState(roomprop, gameState) {
    this.rooms.filter((room) => room.room === roomprop).gameState = gameState;
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
    this.users = this.users.filter((user) => user.id === id).grid = grid;
    console.log(this.users)
  }

  getGrids(room) {
    let grids = this.users.filter((user) => user.room === room).map((user) => {
        var grid = {}
        grid[user.name] = user.grid
        console.log(grid)
        return grid
    });
    return grids;
  }
}

module.exports = {
  Users,
};
