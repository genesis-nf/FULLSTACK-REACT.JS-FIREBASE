import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0z9CKi0jmeAVRuuC6tre94DK0dcCD4tY",
  authDomain: "inventario-nf.firebaseapp.com",
  projectId: "inventario-nf",
  storageBucket: "inventario-nf.firebasestorage.app",
  messagingSenderId: "551612585838",
  appId: "1:551612585838:web:d54bc663f422f2721a937f",
  measurementId: "G-4BS9B7BXL7"
  // apiKey: "AIzaSyA0z9CKi0jmeAVRuuC6tre94DK0dcCD4tY",
  // authDomain: "inventario-nf.firebaseapp.com",
  // projectId: "inventario-nf",
  // storageBucket: "inventario-nf.firebasestorage.app",
  // messagingSenderId: "551612585838",
  // appId: "1:551612585838:web:d54bc663f422f2721a937f",
  // measurementId: "G-4BS9B7BXL7"
};

const app = initializeApp(firebaseConfig);
export const fbAuth = getAuth(app);
export default fbAuth;