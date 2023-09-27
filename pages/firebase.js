import firebase from 'firebase/app';
import 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig ={
    apiKey: 'AIzaSyBia3flf7_iqreOC7znjwSStp8pKWWXJso',
  authDomain: 'new-project-8f51a.firebaseapp.com',
  databaseURL: "https://new-project-8f51a-default-rtdb.firebaseio.com",
  projectId: 'new-project-8f51a',
  storageBucket: 'new-project-8f51a.appspot.com',
  messagingSenderId: '734314745721',
  appId: '1:734314745721:web:92d8399d908a593e5829a8'
}
if (!firebase.apps.length) {
    var app=firebase.initializeApp(firebaseConfig);
 }else {
    var app= firebase.app(); // if already initialized, use that one
 }

export const auth = app.auth();
//export const database = getDatabase(app);
export const database = firebase.database();

export default app