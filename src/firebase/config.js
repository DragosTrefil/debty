import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "************************************",
  authDomain: "**********.firebaseapp.com",
  projectId: "**********",
  storageBucket: "***********.appspot.com",
  messagingSenderId: "*****************",
  appId: "*******************************************"
};



//init firebase

firebase.initializeApp(firebaseConfig)


//init services

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export  { projectFirestore, projectAuth, timestamp  }