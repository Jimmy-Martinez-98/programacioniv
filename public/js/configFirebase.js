// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDPsWKoc7J7rpdYuTd_QXy-r8lHWEKZPf8",
  authDomain: "agro-producers.firebaseapp.com",
  databaseURL: "https://agro-producers.firebaseio.com",
  projectId: "agro-producers",
  storageBucket: "agro-producers.appspot.com",
  messagingSenderId: "823982854167",
  appId: "1:823982854167:web:986da2c4f34d8073718c52",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firebaseAuth = firebase.auth();
var firebaseDB=firebase.database();
