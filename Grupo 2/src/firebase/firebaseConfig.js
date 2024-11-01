import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNUlLS9KX9cv5nPAnnRbj7cd3rvQuB8FQ",
    authDomain: "grupo-2-a8fc2.firebaseapp.com",
    projectId: "grupo-2-a8fc2",
    storageBucket: "grupo-2-a8fc2.firebasestorage.app",
    messagingSenderId: "1080712047803",
    appId: "1:1080712047803:web:df32e43af0c4c4c0610d9e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
