import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDm5w8V48pMPWne0ZSIjjdafQkctuV5_uQ",
    authDomain: "linkedin-clone-475dd.firebaseapp.com",
    projectId: "linkedin-clone-475dd",
    storageBucket: "linkedin-clone-475dd.appspot.com",
    messagingSenderId: "951391649348",
    appId: "1:951391649348:web:918a8812cdbde3ca330611",
    measurementId: "G-SX9KPTCRD4"
  };
 
 const firebaseApp= firebase.initializeApp(firebaseConfig);
 const db =firebaseApp.firestore();
 const auth =  firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider();
 const storage = firebase.storage();

 export {auth,provider,storage};
 export default db;