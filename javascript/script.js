// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTdX98yp6RCe1f66XMBbE5WBEDz6Rnlt4",
    authDomain: "student-management-9c359.firebaseapp.com",
    projectId: "student-management-9c359",
    storageBucket: "student-management-9c359.firebasestorage.app",
    messagingSenderId: "937277445352",
    appId: "1:937277445352:web:7c9622822cca28e64f255d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.register = async () => {
    try {
        let fullName = document.getElementById("fullName").value;
        let registerEmail = document.getElementById("registerEmail").value;
        let registerPassword = document.getElementById("registerPassword").value;

        if (!fullName || !registerEmail || !registerPassword) {
            alert("Please enter all the details");
            return;
        }

        await createUserWithEmailAndPassword(auth, registerEmail, registerPassword, fullName);
        alert("User Sucessfully Registered ✔");
        document.getElementById("fullName").value = "";
        document.getElementById("registerEmail").value = "";
        document.getElementById("registerPassword").value = "";
        return;

    } catch (error) {
        console.log(error);
        alert("something went wrong");
    }
}


window.login = async () => {
    try {

        let loginEmail = document.getElementById("loginEmail").value;
        let loginPassword = document.getElementById("loginPassword").value;

        if (!loginEmail || !loginPassword) {
            alert("Please Enter All the details");
            return;
        }

        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        alert("User Login Sucessfully ✔");
        document.getElementById("loginEmail").value = "";
        document.getElementById("loginPassword").value = "";
        return;

    } catch (error) {
        console.log(error);
        alert("something went wrong");

    }
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Not Loged In ❌");
        return;
    }
    window.location.href = "dashboard.html";
    return;
})

