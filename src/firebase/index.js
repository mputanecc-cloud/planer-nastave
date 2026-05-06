import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCLO_QG_ldL9q-ZsnFfa7JNrY7q0vx8zew",
  authDomain: "planer-nastave.firebaseapp.com",
  databaseURL: "https://planer-nastave-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "planer-nastave",
  storageBucket: "planer-nastave.firebasestorage.app",
  messagingSenderId: "129634867151",
  appId: "1:129634867151:web:2670526645e58114bee4ba"
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db }