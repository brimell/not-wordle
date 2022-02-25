import io from "socket.io-client";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();

function getPort() {
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt").limit(25);

	const [messages] = useCollectionData(query, { idField: "id" });
}

const socket = io.connect("https://notwordle.herokuapp.com:5000");
// const socket = io('https://rimell.cc:5000')
// const socket = io('http://localhost:3000')

export default socket;
