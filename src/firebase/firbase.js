import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAULgojkjqLxRBq25kNz9xcpU6zqmTCQMc",
    authDomain: "expense-tracker-12b20.firebaseapp.com",
    databaseURL: "https://expense-tracker-12b20.firebaseio.com",
    projectId: "expense-tracker-12b20",
    storageBucket: "expense-tracker-12b20.appspot.com",
    messagingSenderId: "217715217092",
    appId: "1:217715217092:web:4f9a4ee58fb945f7f2af91"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
