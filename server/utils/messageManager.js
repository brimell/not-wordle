function messageManager(socket, io, utils) {
	socket.on("message-send", (props) => {
		const user = utils.getUser(socket.id);
		let date = new Date();
		let time = date.getHours() + ":" + date.getMinutes();
		let data = {
			message: props.message,
			room: user.room,
			user: user,
			time: time,
		};
		utils.saveMessage(data);
		io.to(user.room).emit("message-receive", utils.getMessages(user.room));
	});
	socket.on("fetch-messages", (props) => {
		const user = utils.getUser(socket.id);
		socket.emit("fetch-messages-res", utils.getMessages(user.room));
	});
}

module.exports = messageManager;
