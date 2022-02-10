const { readFileSync } = require("fs");
const { createServer } = require("https");
const { Server } = require("socket.io");
const rateLimit = require("express-rate-limit");

const credentials = {
  key: readFileSync("/etc/letsencrypt/live/rimell.cc/privkey.pem"),
  cert: readFileSync("/etc/letsencrypt/live/rimell.cc/fullchain.pem"),
};
const socketioServer = createServer(credentials);
const io = new Server(socketioServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://rimell.cc:5000",
      "https://rimell.cc:3001",
      "https://rimell.cc:5000",
      "https://github.com",
      "https://raaydon.github.io",
      "https://admin.socket.io",
    ],
  },
});

const { instrument } = require("@socket.io/admin-ui");

const { Users } = require("./utils/users");
let users = new Users();
const common = require("../src/Wordlist/common.json");

const path = require("path");
const express = require("express");

const app = express();

// uncomment to run locally

// const http = require("http");
// const express = require("express");
// const socketio = require("socket.io");
// const cors = require("cors");

// const { instrument } = require("@socket.io/admin-ui");

// const { Users } = require("./utils/users");
// let users = new Users();
// const common = require("../src/Wordlist/common.json");

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:5000",
//       "http://rimell.cc:5000",
//       "https://github.com",
//       "https://raaydon.github.io",
//       "https://admin.socket.io",
//     ],
//   },
// });
// app.use(cors());

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
      socket.to(props.room).broadcast.emit('user-connected', socket.id) // for voice call
    }
    if (props.role === "host") {
      console.log("was host");
      users.updateGameState(props.room, "lobby");
      console.log(this.rooms);
    }
    // console.log(users.getRoomList())
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
      // console.log("users fetched in room: ", user.room);
      // console.log(users.getUserList(user.room));
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
    }
  });

  socket.on("getUser", (id) => {
    const user = users.getUser(id);
    if (user) {
      io.to(socket.id).emit("getUserRes", user);
    }
  });

  socket.on("update-grid", (grid) => {
    const user = users.getUser(socket.id);
    if (user) {
      users.updateGrid(user.id, grid);
      console.log('grids: ',users.getGrids(user.room))
      io.to(user.room).emit("update-grid-client", users.getGrids(user.room));
    } else {
      console.log("user not found: ", socket.id, grid, users);
    }
  });

  socket.on("leave-room", (props) => {
    let user = users.removeUser(socket.id);

    if (user) {
      users.removeRoom(user.room);
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
      socket.leave(user.room);
      socket.broadcast.emit("updateRooms", users.getRoomList());
    } else {
      console.log("cannot leave room as user is: ", user);
    }
  });

  socket.on("disconnect", () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
      socket.to(user.room).broadcast.emit('user-disconnected', user.id) // for voice call
      if (
        users.getRoomList(user.room).filter((room) => room.room === user.room)
          .length === 1
      ) {
        users.removeRoom(user.room);
      }
      socket.broadcast.emit("updateRooms", users.getRoomList());
    }
  });
});

// app.use(
//   rateLimit({
//     windowMs: 30000, // 30 seconds
//     max: 500,
//     message: "You exceeded the rate limit.",
//     headers: true,
//   })
// );

// if you want to host on / then change package.json homepage to /

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/notwordle", (req, res) => {
  res.send("notwordle");
});
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});
const server = createServer(credentials, app);
server.listen(3001, () => {
  console.log("express server listening on port 3001");
});

const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
socketioServer.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
instrument(io, { auth: false }); // go to admin.socket.io for admin panel
