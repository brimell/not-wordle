/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDIgIufkkeJ480bs1d_dB03bExDgVD_iXk",
  authDomain: "notwordle.firebaseapp.com",
  projectId: "notwordle",
  storageBucket: "notwordle.appspot.com",
  messagingSenderId: "528149663499",
  appId: "1:528149663499:web:33d256afd29a38b8d3dc0e",
  measurementId: "G-PQ95ZCSXWL"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);

export {firebase, database}