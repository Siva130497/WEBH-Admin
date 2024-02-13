import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
    // Add your Firebase SDK configuration object here
    apiKey: "AIzaSyCAkRk-Ap_Nh1VpFyDfP6n65i6ri3xtyeY",
    authDomain: "mywebh-dev.firebaseapp.com",
    projectId: "mywebh-dev",
    storageBucket: "mywebh-dev.appspot.com",
    messagingSenderId: "1066015862549",
    appId: "1:1066015862549:web:db34c8d59279d0f550031c"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export { messaging };
