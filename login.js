import { signInWithEmailAndPassword , sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./config.js";

const form  = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const forgotBtn = document.querySelector(".link");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(email.value);
  console.log(password.value);

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = "index.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});



forgotBtn.addEventListener("click", () => {
  sendPasswordResetEmail(auth, prompt("enter your email"))
    .then(() => {
      alert("email send successfullt")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      
    });
});