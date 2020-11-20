import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVOXYeYWu-K9kvNAhnawVyvKurgVbhpZc",
  authDomain: "musify-5487d.firebaseapp.com",
  databaseURL: "https://musify-5487d.firebaseio.com",
  projectId: "musify-5487d",
  storageBucket: "musify-5487d.appspot.com",
  messagingSenderId: "71285042472",
  appId: "1:71285042472:web:d62cb25c20570ff08cf41d",
  measurementId: "G-HE50918T3B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export {db};