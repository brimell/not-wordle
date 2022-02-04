const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { instrument } = require("@socket.io/admin-ui");

const { Users } = require("./utils/users");
let users = new Users();
const common = require("../src/Wordlist/common.json");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://rimell.cc:5000",
      "https://github.com",
      "https://raaydon.github.io",
      "https://admin.socket.io",
    ],
  },
});
app.use(cors());

const makeRandom = () => Math.random();
let random = makeRandom();
function pick(array) {
  return array[Math.floor(array.length * random)];
}
const targets = common.slice(0, 20000); // adjust for max target freakiness
function randomTarget(wordLength) {
  const eligible = targets.filter((word) => word.length === wordLength);
  return pick(eligible);
}

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("joinRoom", (props) => {
    let dup = false;
    for (let username in users.getUserList(props.room)) {
      if (username === props.name) {
        io.to(socket.id).emit("joinRoomRes", { res: false });
        dup = true;
      }
    }
    if (!dup) {
      socket.join(props.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, props.name, props.room, props.role);

      io.to(props.room).emit("updateUsersList", users.getUserList(props.room));
      io.to(socket.id).emit("joinRoomRes", { res: true });
    }
    if (props.role === "host") {
      users.updateGameState(props.room, "lobby");
    }
    console.log(users.getRoomList())
    socket.broadcast.emit("updateRooms", users.getRoomList());
  });

  socket.on("gameFinish", (gameState) => {
    const user = users.getUser(socket.id);
    if (gameState === "Won") {
      io.to(user.room).emit("gameWon", user.id);
      users.updateGameState(user.room, "finished");
      socket.broadcast.emit("updateRooms", users.getRoomList());
    } else if (gameState === "Lost") {
      io.to(user.room).emit("gameLost", user.id);
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

  socket.on("fetchFullUsersList", () => {
    const user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "updateFullUsersList",
        users.getFullUserList(user.room)
      );
    }
  });
  socket.on("fetchUserListByRoom", (room) => {
    io.to(socket.id).emit("fetchUserListByRoomRes", users.getUserList(room));
  });
  socket.on("fetchUserList", (props) => {
    const user = users.getUser(socket.id);
    if (user) {
      console.log("users fetched in room: ", user.room);
      console.log(users.getUserList(user.room));
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
    }
  });

  socket.on("getUser", (id) => {
    const user = users.getUser(id);
    if (user) {
      io.to(socket.id).emit("getUserRes", user);
    }
  });

  socket.on("update-grid", (props) => {
    const user = users.getUser(socket.id);
    users.updateGrid(user.id, props.grid);
    io.to(user.room).emit("update-grid-client");
  });

  socket.on("leave-room", (props) => {
    let user = users.removeUser(socket.id);

    if (user) {
      users.removeRoom(user.room);
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
      socket.leave(user.room);
    } else {
      console.log("cannot leave room as user is: ", user);
    }
    socket.broadcast.emit("updateRooms", users.getRoomList());
  });

  socket.on("disconnect", () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
      if (users.getRoomList(user.room).filter((room) => room.room === user.room).length === 1) {
        users.removeRoom(user.room);
      }
      socket.broadcast.emit("updateRooms", users.getRoomList());

      }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

instrument(io, { auth: false }); // go to admin.socket.io for admin panel
