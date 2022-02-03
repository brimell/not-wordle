class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room, role) {
    let user = {id, name, room, role};
    this.users.push(user);
    return user;
  }

  getUserList (room) {
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);

    return namesArray;
  }

  getRoomList() {
    var rooms_list = []
    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i]
      if (!(user.room in rooms_list)) {
        rooms_list.push(user.room)
      }
    }
    return rooms_list
    }

  getFullUserList (room) {
    let users = this.users.filter((user) => user.room === room);
    return users;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  removeUser(id) {
    let user = this.getUser(id);

    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  updateGrid(id, grid) {
  this.users.filter((user) => user.id === id).grid = grid;
}
}

module.exports = {
  Users
};