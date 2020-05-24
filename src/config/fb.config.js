import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyApVv85pmjoTA1xA6SPpupWeF9wESXc7zA",
    authDomain: "react-marcet.firebaseapp.com",
    databaseURL: "https://react-marcet.firebaseio.com",
    projectId: "react-marcet",
    storageBucket: "react-marcet.appspot.com",
    messagingSenderId: "755954039030",
    appId: "1:755954039030:web:5a2c303006f7e7113ed4d7",
    measurementId: "G-TTYXPZZQDR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;