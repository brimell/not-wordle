function messageManager(socket,io,utils) {
    socket.on('message-send', (props) => {
        let message = props.message;
        let room = props.room;
        let user = props.user;
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
    socket.on('fetch-messages', () => {
        let messages = utils.getMessages();
        socket.emit('fetch-messages-res', messages);
    })
}

module.exports = messageManager;