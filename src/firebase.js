import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyD8QF0OWHytMgLFQyIlgFazqMXeAGfFCu4',
  authDomain: 'whatapp-react-firebase.firebaseapp.com',
  projectId: 'whatapp-react-firebase',
  storageBucket: 'whatapp-react-firebase.appspot.com',
  messagingSenderId: '1027078551035',
  appId: '1:1027078551035:web:f156183c140075e76a075e',
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export default db
export { auth, provider }