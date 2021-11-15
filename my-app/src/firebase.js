import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyBP-Ti9ZkwFQXa9Xa7DD52U1d1wiY_zdls",
  authDomain: "netflix-clone-89097.firebaseapp.com",
  projectId: "netflix-clone-89097",
  storageBucket: "netflix-clone-89097.appspot.com",
  messagingSenderId: "541369303332",
  appId: "1:541369303332:web:7c7a76235772d2bfb1f3b1",
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();


export { auth };
export default db;