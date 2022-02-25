import io from "socket.io-client";
import axios from 'axios';

function getPort() {
    axios.get('http://localhost:3000/port')
}

const socket = io.connect(`https://notwordle.herokuapp.com:${getPort()}`);
// const socket = io('https://rimell.cc:5000')
// const socket = io('http://localhost:3000')

export default socket;
