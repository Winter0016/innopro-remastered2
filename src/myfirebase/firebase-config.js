// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore' 
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyALT8pgqTioyZUbiwFjIWtSEjbvn0EN9ok",
  authDomain: "cua-hang-phuc-2.firebaseapp.com",
  projectId: "cua-hang-phuc-2",
  storageBucket: "cua-hang-phuc-2.appspot.com",
  messagingSenderId: "150284056607",
  appId: "1:150284056607:web:2dab7ddbc0e3f70356fd2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage =  getStorage(app);
