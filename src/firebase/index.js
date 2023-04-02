
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCqH9VGaIaFfmenpOqLVAZ5hjaJbM1gVyA',
  authDomain: 'my-todo-4e4b7.firebaseapp.com',
  projectId: 'my-todo-4e4b7',
  storageBucket: 'my-todo-4e4b7.appspot.com',
  messagingSenderId: '298457246015',
  appId: '1:298457246015:web:f4456985e491e40303cb8a'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db
}