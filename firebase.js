import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
 
  };
 
  const app=firebase.initializeApp(firebaseConfig);


 


  const db = app.firestore();
  const auth = firebase.auth();

  export{db,auth}
