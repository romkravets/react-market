import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'

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

  // if (window.location.hostname === 'localhost') {
  //   console.log('Localhost detected');
  //   firebase.db.settings({
  //     host: 'localhost: 3000',
  //     ssl: false
  //   });
  //   firebase.functions().useFunctionsEmulator('http://localhost:5001');
  // }

const db = firebase.firestore();
const storage = firebase.storage();
export { db };
export { storage, firebase as default};

