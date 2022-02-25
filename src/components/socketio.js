import io from "socket.io-client";

// const socket = io.connect('https://notwordle.herokuapp.com:5000')
// const socket = io('https://rimell.cc:5000')
const socket = io('http://localhost:3000')

export default socket