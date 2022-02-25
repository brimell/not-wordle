import io from "socket.io-client";
import axios from "axios";

function getPort() {
	if (window.location.host.startsWith("localhost")) {
		return 3000;
	}
	axios.get(window.location.origin + "/port").then((res) => {
		return res.data;
	});
}

const socket = io.connect(`https://notwordle.herokuapp.com:${getPort()}`);
// const socket = io('https://rimell.cc:5000')
// const socket = io('http://localhost:3000')

export default socket;
