import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC065TVIqadZfzSI8bVWlsUgYegZGSDlVE",
  authDomain: "xn--11by0j.firebaseapp.com",
  projectId: "xn--11by0j",
  storageBucket: "xn--11by0j.appspot.com",
  messagingSenderId: "741657005267",
  appId: "1:741657005267:web:df87c536920798cf8b9826"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
export { auth, firebase, provider };
