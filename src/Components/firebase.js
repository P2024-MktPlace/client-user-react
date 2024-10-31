// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Retrieve Firebase configuration from environment variables
const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  apiKey: 'AIzaSyCOUwDY2O3yWeZ_ESi7DKsMMQlkcOchMX4',
  authDomain: 'localhost',
  projectId: 'jewel-project-react-spring',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
