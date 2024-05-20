
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBKKAwGJ4O9psD1QLGSo6N6qIq82tj5biA",
  authDomain: "netflix-clone-b91c9.firebaseapp.com",
  projectId: "netflix-clone-b91c9",
  storageBucket: "netflix-clone-b91c9.appspot.com",
  messagingSenderId: "355308180936",
  appId: "1:355308180936:web:de0004c64823ddf3b49cfd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

 const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user", {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        }))
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(''));
    }
 }
 const login = async (email, password)=> {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(''));
    }
 }

 const logout = () => {
    signOut(auth);
 }

 export {auth, db, login, signup, logout} ;