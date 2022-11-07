import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDHQuTnhcWx4ZazhFpKKs6HGLXceJ4H43w",
    authDomain: "nightlife-7e64b.firebaseapp.com",
    projectId: "nightlife-7e64b",
    storageBucket: "nightlife-7e64b.appspot.com",
    messagingSenderId: "76508944337",
    appId: "1:76508944337:web:bc32809c1b322bb35272f0"
  };
 
  const app=firebase.initializeApp(firebaseConfig);


 


  const db = app.firestore();
  const auth = firebase.auth();

  export{db,auth}