import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = process.env.REACT_APP_firebaseConfig;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export { db };
