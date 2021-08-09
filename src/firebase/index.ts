import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyBkDNv02mZqfztJ-OtVzpap_Q0WBKKHGBk',
	authDomain: 'task-app-5e27f.firebaseapp.com',
	projectId: 'task-app-5e27f',
	storageBucket: 'task-app-5e27f.appspot.com',
	messagingSenderId: '840847041195',
	appId: '1:840847041195:web:01833b83aea0f1e4b70dee',
	measurementId: 'G-NGG0283498',
}

firebase.initializeApp(firebaseConfig)

export default firebase
