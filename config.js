import * as firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyA42KIDYAoM9uQUUWrzozQ1_EPpORAvU4U",
    authDomain: "lynxy-library.firebaseapp.com",
    projectId: "lynxy-library",
    storageBucket: "lynxy-library.appspot.com",
    messagingSenderId: "708256387532",
    appId: "1:708256387532:web:e0e443d3993f443acf8d69"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();