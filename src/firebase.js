
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD2tl09c_yFYi5eDZAFFemVQCBbmBK7nJk",
  authDomain: "netflix-clone-c77f5.firebaseapp.com",
  projectId: "netflix-clone-c77f5",
  storageBucket: "netflix-clone-c77f5.firebasestorage.app",
  messagingSenderId: "606377024572",
  appId: "1:606377024572:web:61f8247df887b9b7127739"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }  
}
const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout =  () => {
    signOut(auth);
}
export {auth,db,login,signup,logout}