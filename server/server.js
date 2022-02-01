const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors')
var connect = require('connect');

var MemoryStore = require('connect/lib/middleware/session/memory')
var session_store = new MemoryStore();

const { instrument } = require('@socket.io/admin-ui')

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ['http://localhost:3000','https://admin.socket.io']
  }
});
app.use(cors())
app.configure(function () {
  app.use(express.session({ store: session_store }));
});

io.on('connection', socket => {
  console.log('new connection',socket.id)
  var cookie_string = socket.request.headers.cookie;
  var parsed_cookies = connect.utils.parseCookie(cookie_string);
  var connect_sid = parsed_cookies['connect.sid'];
  if (connect_sid) {
    session_store.get(connect_sid, function (error, session) {
      //HOORAY NOW YOU'VE GOT THE SESSION OBJECT!!!!
    });
  }

  socket.on('join-room', ({ name, room }) => {
    const user = userJoin(socket.id, name, 'user', room);

    socket.join(user.room);

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  socket.on('create-room', props => {
    console.log(`${props.name} created room: ${props.code}`)

    const user = userJoin(socket.id, props.name, props.code);
    socket.join(user.room);

    

  })

  socket.on('fetchUserList', props => {
    const user = getCurrentUser(socket.id);
    socket.emit(getRoomUsers(user))
  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

instrument(io, {auth: false})