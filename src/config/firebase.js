import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Configuration Firebase pour sunu4image1mot
const firebaseConfig = {
  apiKey: "AIzaSyDXyZcEnc3MrgPvV7W1QcanMvlZ9iGxlMw",
  authDomain: "sunu4image1mot.firebaseapp.com",
  projectId: "sunu4image1mot",
  storageBucket: "sunu4image1mot.firebasestorage.app",
  messagingSenderId: "390074255065",
  appId: "1:390074255065:web:03963e8edaa6e272bfe0c8",
  measurementId: "G-9N0R7V00DJ"
}

// Initialiser Firebase
const app = initializeApp(firebaseConfig)

// Services Firebase
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app

