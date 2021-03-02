import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBvkG9rzkM8ZTyDFCx3hHfYQUk1wNvLzi0",
    authDomain: "poshcenter-dd8d0.firebaseapp.com",
    projectId: "poshcenter-dd8d0",
    storageBucket: "poshcenter-dd8d0.appspot.com",
    messagingSenderId: "320177071232",
    appId: "1:320177071232:web:98377a80b950cd544b7265",
    measurementId: "G-561N17ZWYQ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
