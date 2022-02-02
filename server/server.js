const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { instrument } = require("@socket.io/admin-ui");

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  updateGrid,
} = require("./utils/users.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://admin.socket.io",
    ],
  },
});
app.use(cors());

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("join-room", (props) => {
    const user = userJoin(socket.id, props.name, props.code, "user");
    io.to(user.room).emit("user-list", getRoomUsers(user.room));
    socket.join(user.room);
  });

  socket.on("create-room", (props) => {
    console.log(`${props.name} created room: ${props.code}`);

    const user = userJoin(socket.id, props.name, props.code, "host");
    socket.join(user.room);
  });

  socket.on("start-game", (props) => {
    const user = getCurrentUser(socket.id);

    console.log("game started in room: ", user.room);

    io.to(user.room).emit("game-started");
  });

  socket.on("fetchUserList", (props) => {
    const user = getCurrentUser(socket.id);
    if (user) {
      socket.emit("user-list", getRoomUsers(user.room));
    } else {
      socket.emit("user-list", false);
    }
  });

  socket.on("update-grid", (props) => {
    const user = getCurrentUser(socket.id);
    updateGrid(user.id, props.grid);
    io.to(user.room).emit("update-grid-client");
  });

  socket.on("leave-room", (props) => {
    const user = getCurrentUser(socket.id);

    if (user) {
      userLeave(socket.id);
      socket.leave(user.room);
    } else {
      console.log("cannot leave room as user is undefined", user);
    }
  });

  socket.on("disconnect", () => {
    const user = getCurrentUser(socket.id);
    console.log("disconnect user: ", user);
    if (user) {
      user.disconnected = true;
      setTimeout(function () {
        console.log("test");
        if (user.disconnected) {
          userLeave(socket.id);
        }
      }, 10000);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

instrument(io, { auth: false }); // go to admin.socket.io for admin panel
