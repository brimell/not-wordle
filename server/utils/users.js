const users = [];

// Join user to chat
function userJoin(id, username, room, role) {
  const user = { id, username, room, role };
  users.push(user)

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  delete users[index];
}

// Get room users
function getRoomUsers(room) {
  console.log('users: ',users)
  return users.filter(user => user.room === room);
}

function updateGrid(id, grid) {
  const index = users.findIndex(user => user.id === id);
  users[index].grid = grid;
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  updateGrid
};