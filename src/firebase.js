const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');


 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDvBw1O87q8A-uhqkeMKEfFvakjQoHpaek",
    authDomain: "protoreseauxsociaux.firebaseapp.com",
    databaseURL: "https://protoreseauxsociaux.firebaseio.com",
    projectId: "protoreseauxsociaux",
    storageBucket: "protoreseauxsociaux.appspot.com",
    messagingSenderId: "401541589521"
  };
  firebase.initializeApp(config);

  export default firebase;