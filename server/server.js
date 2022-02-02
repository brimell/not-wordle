const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors')

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
    origin: ['http://localhost:3000','http://localhost:3001','https://admin.socket.io']
  }
});
app.use(cors())

io.on('connection', socket => {
  console.log('new connection',socket.id)

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

  socket.on('start-game', props => {
    console.log('game started')
  
    const user = getCurrentUser(socket.id);
    console.log(getRoomUsers(user.room))
    io.to(user.room).emit('game-started', {})


  })

  socket.on('fetchUserList', props => {
    const user = getCurrentUser(socket.id);
    socket.emit(getRoomUsers(user.room))
  })

  socket.on('disconnect', () => {
    const user = getCurrentUser(socket.id);

    if (user) {
      user.disconnected = true;
        setTimeout(function () {
            if (user.disconnected) {
              userLeave(socket.id);
            }
        }, 10000);
  }
    })
    
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

instrument(io, {auth: false}) // go to admin.socket.io for admin panel