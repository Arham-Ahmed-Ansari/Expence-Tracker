// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { getFirestore, addDoc, deleteDoc, updateDoc, doc, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

let currentUserId = null;
let editExpenceId = null;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
    let userInfo = document.querySelector("#userInfo");
    let logedInName = document.getElementById("logedInName");
    currentUserId = user.uid;

    logedInName.innerHTML = `Loged In as : ${user.email}`;
    getExpence()
})

window.logout = async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html";
        return;
    } catch (error) {
        console.log(error);
    }
}

window.addExpense = async () => {
    try {
        let title = document.getElementById("title").value;
        let amount = Number(document.getElementById("amount").value);
        let category = document.getElementById("category").value;
        let date = document.getElementById("date").value;

        if (!title || !amount || !category || !date) {
            alert("Please Enter All the Details");
        }

        if (editExpenceId) {
            await updateDoc(doc(db, "expences", editExpenceId), {
                title: title,
                amount: amount,
                date: date,
            });
            alert("Expence Updated Sucessfully ✔");

            document.getElementById("title").value = "";
            document.getElementById("amount").value = "";
            document.getElementById("category").value = "";
            document.getElementById("date").value = "";
            return;

        }
        else {

            await addDoc(collection(db, "expences"), {
                title: title,
                amount: amount,
                category: category,
                date: date,
                createdAt: new Date(),
                uid: currentUserId,
            });

            document.getElementById("title").value = "";
            document.getElementById("amount").value = "";
            document.getElementById("category").value = "";
            document.getElementById("date").value = "";

            alert("Expences Added Sucessfully ✔");
            return;
        }
    } catch (error) {
        console.log(error);
    }
}


function getExpence() {

    const q = query(collection(db, "expences"), where("uid", "==", currentUserId));

    onSnapshot(q, (snapshot) => {


        let expenceItem = document.getElementById("expenceItem");
        expenceItem.innerHTML = "";
        let totalExpence = document.getElementById("totalExpence");
        totalExpence.innerHTML = "";
        let total = 0;

        if (snapshot.empty == true) {
            let emptyText = document.getElementById("emptyText");
            emptyText.innerHTML = `<h2>No expenses found</h2>`
        }
        else {
            emptyText.innerHTML = "";
            snapshot.forEach(doc => {
                expenceItem.innerHTML += `
            <div class="expense-card">
                  <div>
                      <h3>${doc.data().title}</h3>
                      <p>${doc.data().date}</p>
                      
                  <button class = "primary-btn deleteBtn" onclick = "deleteExpence('${doc.id}')">Delete</button>
                  <button class = "primary-btn editBtn" onclick = "editExpence('${doc.id}','${doc.data().title}','${doc.data().date}','${doc.data().amount}')">Edit</button>
                  </div>
                  <span class="expense-amount">Rs ${doc.data().amount}</span>
              </div>
            `
                total = total + doc.data().amount;
                totalExpence.innerHTML = total;

            });
        }
    })
}


window.deleteExpence = async (id) => {
    try {
        await deleteDoc(doc(db, "expences", id));
        alert("Expence Deleted Sucessfully ✔");
        return;
    } catch (error) {
        console.log(error);
    }
}

window.editExpence = async (id, title, date, amount,) => {
    try {
        document.getElementById("title").value = title;
        document.getElementById("amount").value = amount;
        document.getElementById("date").value = date;

        editExpenceId = id;
    } catch (error) {
        console.log(error);

    }
}