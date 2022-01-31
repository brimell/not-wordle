import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);