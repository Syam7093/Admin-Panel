
import { initializeApp } from "firebase/app";
import  {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDuw3Lkm9xwepgR2JDpq27u7QHcaw_3q9w",
  authDomain: "personal-34938.firebaseapp.com",
  projectId: "personal-34938",
  storageBucket: "personal-34938.appspot.com",
  messagingSenderId: "900116557845",
  appId: "1:900116557845:web:c327b80ae11862427f9e1c"
};


const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)