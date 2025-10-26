// console.log("hell world");

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js"; 

const form = document.querySelector("#form");
const todoTitle = document.querySelector("#todo-title");
const todoDesc = document.querySelector("#todo-desc");


const userData = {
    title : todoTitle.value,
    todoDesc : todoDesc.value
}


form.addEventListener("submit" ,async(e)=>{
    e.preventDefault();
 try {
  const docRef = await addDoc(collection(db, userData), {
   
  })
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.log("Error adding document: ", e);
}
})