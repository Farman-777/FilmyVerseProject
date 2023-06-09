import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWyEu0XuPKxL8cuD-0V-UIhZbMpI_vfjw",
  authDomain: "filmyverse-cc5db.firebaseapp.com",
  projectId: "filmyverse-cc5db",
  storageBucket: "filmyverse-cc5db.appspot.com",
  messagingSenderId: "189756752397",
  appId: "1:189756752397:web:cea2c778e41f30fdc2cb44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //This line initializes the Firebase app using the provided firebaseConfig object. It sets up the necessary configuration to connect to your Firebase project.
export const db = getFirestore(app); //This line creates a Firestore database instance by calling getFirestore() with the app object as the parameter. It initializes the Firestore database and returns a reference to it, which is assigned to the db constant. This allows you to interact with the Firestore database.
export const moviesRef = collection(db, "movies"); //This line creates a reference to the "movies" collection in your Firestore database. The collection() function takes the db reference and the name of the collection as parameters and returns a reference to that collection. The reference is assigned to the moviesRef constant, which you can use to perform operations on the "movies" collection
export const reviewsRef = collection(db, "reviews"); //This line creates a reference to the "reviews" collection in your Firestore database. Similar to the previous line, it uses the collection() function to get a reference to the "reviews" collection and assigns it to the reviewsRef constant.
export const usersRef = collection(db, "users"); //This line creates a reference to the "users" collection in your Firestore database. Again, it uses the collection() function to obtain a reference to the "users" collection and assigns it to the usersRef constant.
//These references allow you to interact with the respective collections in your Firestore database, such as performing CRUD operations (create, read, update, delete) on the documents within those collections.

export default app; 
