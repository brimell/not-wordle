import io from "socket.io-client";

const socket = io.connect('https://rimell.cc:5000')
// const socket = io('http://rimell.cc:5000')
// const socket = io('http://localhost:5000')

export default socket