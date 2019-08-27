import firebase from 'firebase'

let firebaseConfig = {
  apiKey: "AIzaSyAHSF-oSATvoRq2TMuLj8Aq1AN-bPd1QTQ",
  authDomain: "oauth-b708a.firebaseapp.com",
  databaseURL: "https://oauth-b708a.firebaseio.com",
  projectId: "oauth-b708a",
  storageBucket: "",
  messagingSenderId: "593670935260",
  appId: "1:593670935260:web:2cbe2a8dc91f1adf"
}

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export const db = app.database()
