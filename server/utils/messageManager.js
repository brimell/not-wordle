function messageManager(socket,io,utils) {
    socket.on('message-send', () => {
        let message = socket.request.body.message;
        let room = socket.request.body.room;
        let user = socket.request.body.user;
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes();
        let data = {
            message: message,
            room: room,
            user: user,
            time: time
        };
        io.to(room).emit('message-receive', data);
        utils.saveMessage(data);
    })
}

module.exports = messageManager;