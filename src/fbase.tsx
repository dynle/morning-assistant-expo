import firebase from "firebase/app";

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAkq_vCJWUdJFzV556DQ3HmnlYJ2MEmCG0",
    authDomain: "morning-assistant-8717d.firebaseapp.com",
    databaseURL: "https://morning-assistant-8717d.firebaseio.com",
    projectId: "morning-assistant-8717d",
    storageBucket: "morning-assistant-8717d.appspot.com",
    messagingSenderId: "658921868833",
    appId: "1:658921868833:ios:24a9931a1192a6512b9d60", //use apple app
    measurementId: "G-measurement-id",
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export const fbase = firebase;
export const auth = firebase.auth();
