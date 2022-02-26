import io from "socket.io-client";
import axios from "axios";

function getPort() {
	axios.get("https://notwordle.herokuapp.com/port").then((res) => {
		console.log('port: ',res.data)
		return res.data;
	});
}
var socket;

if (window.location.host.startsWith("localhost")) {
	socket = io.connect("http://localhost:3001");
} else if (window.location.host.startsWith("rimell")) {
	socket = io.connect(`https://rimell.cc/notwordle`);
} else {
	// socket = io.connect(`https://notwordle.herokuapp.com:${getPort()}`);
	socket = io.connect(`https://notwordle.herokuapp.com`);
}
// const socket = io('https://rimell.cc:5000')
// const socket = io('http://localhost:3000')
// const socket = io('http://localhost:5000')

export default socket;
