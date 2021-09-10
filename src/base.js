import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAet4Qdv37vW-sYQU20UtAhmvzGc6a-7TE",
    authDomain: "very-hot-burgers-6b818.firebaseapp.com",
    databaseURL: "https://very-hot-burgers-6b818-default-rtdb.firebaseio.com"
    
})

const base=Rebase.createClass(firebaseApp.database())

export {firebaseApp}
export default base