const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { instrument } = require("@socket.io/admin-ui");

const { Users } = require("./utils/users");
let users = new Users();

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

  socket.on("joinRoom", (props) => {
    let dup = false;
    for (let username in users.getUserList(props.room)) {
      if (username === props.name) {
        io.to(socket.id).emit("joinRoomRes", { res: false });
        dup = true;
      }
    }
    if (!dup) {
      console.log(props.name);
      socket.join(props.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, props.name, props.room, props.role);

      io.to(props.room).emit("updateUsersList", users.getUserList(props.room));
      io.to(socket.id).emit("joinRoomRes", { res: true });
    }
  });

  socket.on("start-game", (props) => {
    const user = users.getUser(socket.id);
    if (users.getUser(socket.id).role === "host") {
      console.log("game started in room: ", user.room);

      io.to(user.room).emit("game-started", { res: true });
    } else {
      io.to(user.room).emit("game-started", { res: false });
    }
  });

  socket.on("fetchFullUsersList", (props) => {
    const user = users.getUser(socket.id);
    console.log('fetched')
    if (user) {
      io.to(user.room).emit(
        "updateFullUsersList",
        users.getFullUserList(user.room)
      );
    }
  });
  socket.on("fetchUserList", (props) => {
    const user = users.getUser(socket.id);
    if (user) {
      console.log("users fetched in room: ", user.room);
      console.log(users.getUserList(user.room));
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
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
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
      socket.leave(user.room);
    } else {
      console.log("cannot leave room as user is: ", user);
    }
  });

  socket.on("disconnect", () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

instrument(io, { auth: false }); // go to admin.socket.io for admin panel
