import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "00000",
  authDomain: "0000",
  databaseURL: "0000",
  projectId: "000000",
  storageBucket: "00000",
  messagingSenderId: "00000",
  appId: "00000"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage };
export default firebase;
