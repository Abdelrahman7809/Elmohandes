
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNEZ3Blt4ck-X5bzH3Y0q1Qj9TTY4B14Q",
  authDomain: "elmohandes-838e2.firebaseapp.com",
  projectId: "elmohandes-838e2",
  storageBucket: "elmohandes-838e2.firebasestorage.app",
  messagingSenderId: "394716402594",
  appId: "1:394716402594:web:840ac501b9d0c9130cd8fb",
  measurementId: "G-5Z0VQ3E7XR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      if (!user.emailVerified) {
        Swal.fire("الحساب غير مفعل", "يرجى تفعيل بريدك الإلكتروني أولاً.", "warning");
        return;
      }

      localStorage.setItem("loggedInEmail", email);

      Swal.fire("تم تسجيل الدخول", "مرحبًا " + (user.displayName || user.email), "success").then(() => {
        window.location.href = "home.html";
      });
    })
    .catch(error => {
      Swal.fire("خطأ", error.message, "error");
    });
});
