// Interface for database
// Implementation set to firebase

import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAAERSrXStyHsU889OZGfrCFe1E2Bit_xs",
  authDomain: "demos-5e3db.firebaseapp.com",
  databaseURL: "https://demos-5e3db.firebaseio.com",
  storageBucket: "demos-5e3db.appspot.com",
};

const firebaseInstance = firebase.initializeApp(firebaseConfig);

export const database = firebaseInstance.database()
export default firebaseInstance
