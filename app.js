import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  getFirestore, 
  setDoc, 
  doc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBYhxS4gO5HoUsLnY0q0_HlzTOSHASFaHI",
  authDomain: "project-jpg-65d3b.firebaseapp.com",
  projectId: "project-jpg-65d3b",
  storageBucket: "project-jpg-65d3b.firebasestorage.app",
  messagingSenderId: "1070926686670",
  appId: "1:1070926686670:web:df0fa97a6de309ae37e39f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================== REGISTER ==================
window.register = async function() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email
    });

    alert("Registration Successful!");
    window.location.href = "index.html";

  } catch (error) {
    alert(error.message);
  }
}

// ================== LOGIN ==================
window.login = async function() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
}

// ================== LOGOUT ==================
window.logout = async function() {
  await signOut(auth);
  window.location.href = "index.html";
}

// ================== PROTECT DASHBOARD ==================
onAuthStateChanged(auth, async (user) => {
  if (window.location.pathname.includes("dashboard.html")) {
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        document.getElementById("welcome").innerText =
          "Welcome " + docSnap.data().name;
      }
    } else {
      window.location.href = "index.html";
    }
  }

});
