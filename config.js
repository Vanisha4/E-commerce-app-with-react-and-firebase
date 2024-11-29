import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDMKbfi3feG9Skbtz1l3AajUubR7WPoC5I",
    authDomain: "ecommerce-app-with-react-f6d02.firebaseapp.com",
    projectId: "ecommerce-app-with-react-f6d02",
    storageBucket: "ecommerce-app-with-react-f6d02.firebasestorage.app",
    messagingSenderId: "17270189152",
    appId: "1:17270189152:web:6845283a690d37be70a705",
    measurementId: "G-LW4KHW434V"
  };
firebase.intialieApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}