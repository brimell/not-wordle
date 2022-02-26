// const rateLimit = require("express-rate-limit");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const path = require("path");

const { instrument } = require("@socket.io/admin-ui");

const { Users } = require("./utils/users");
let users = new Users();
const SocketManager = require("./utils/SocketManager");

const app = express();
const server = require("http").Server(app);

// socket io server

const io = socketio(server, {
	cors: {
		origin: [
			"http://localhost:3000",
			"https://rimell.cc",
			"https://raaydon.github.io",
			"https://admin.socket.io",
			"https://notwordle.herokuapp.com:*",
		],
	},
});

io.on("connection", (socket) => {
	SocketManager(socket, io, users);
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

app.use(cors());

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/notwordle", (req, res) => {
	res.send("notwordle");
});
app.get("/port", (req, res) => {
	res.send(process.env.PORT);
});
app.get("/not-wordle", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});

var auth = { auth: false };

if (process.env.USERNAME && process.env.PASSWORD) {
	auth = {
		auth: {
			type: "basic",
			username: process.env.USERNAME,
			password: process.env.PASSWORD,
		},
	};
}

instrument(io, auth); // go to admin.socket.io for admin panel
