import io from "socket.io-client";
import axios from "axios";

function getPort() {
	axios.get("https://notwordle.herokuapp.com/port").then((res) => {
		console.log("port: ", res.data);
		return res.data;
	});
}
var socket;

if (window.location.host.startsWith("localhost")) {
	socket = io.connect("http://localhost:3001");
} else if (window.location.host.startsWith("rimell")) {
	socket = io.connect(`https://rimell.cc/notwordle`);
} else if (window.location.host.endsWith("vercel.app")) {
	socket = io.connect(`https://notwordle-raaydon.vercel.app`);
} else if (window.location.host.endsWith("netlify.app")) {
	socket = io.connect(`https://notwordle.netlify.app`);
} else {
	socket = io.connect(`https://notwordle.herokuapp.com`);
}

export default socket;
