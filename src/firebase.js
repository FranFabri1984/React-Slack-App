import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8BMi7KDUYlp3d0NiHnRehcVtsNbqF1Io",
  authDomain: "slack-clone-yt-35200.firebaseapp.com",
  projectId: "slack-clone-yt-35200",
  storageBucket: "slack-clone-yt-35200.appspot.com",
  messagingSenderId: "831193303883",
  appId: "1:831193303883:web:2e9cd7ef0e11571bb636ce"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }