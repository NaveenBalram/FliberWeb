// import * as firebase from 'firebase'
// require('firebase/auth')

import  firebase  from 'firebase'

// const firebaseConfig = {
//     apiKey: "AIzaSyAOddPPNr4eiWI0unrxLEeXH3CaKpy_4mU",
//     authDomain: "fliber-ce017.firebaseapp.com",
//     projectId: "fliber-ce017",
//     storageBucket: "fliber-ce017.appspot.com",
//     messagingSenderId: "1064261331440",
//     appId: "1:1064261331440:web:fd11a24fcda0dce48c5535",
//     measurementId: "G-NGP7X5J0B2"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyD04fOizkWqXXITvbzJuYx5mcErNubX648",
  authDomain: "fliberdev.firebaseapp.com",
  projectId: "fliberdev",
  storageBucket: "fliberdev.appspot.com",
  messagingSenderId: "229868968596",
  appId: "1:229868968596:web:4dc705fa9403d90622b281",
  measurementId: "G-5ZT2B3SHZF"
};

   firebase.initializeApp(firebaseConfig);
   //app.auth();
  export default firebase;