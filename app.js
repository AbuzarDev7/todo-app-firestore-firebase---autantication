// console.log("hell world");

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js"; 
import { db } from "./config.js";
const form = document.querySelector("#form");
const todoTitle = document.querySelector("#todo-title");
const todoDesc = document.querySelector("#todo-desc");
let allTodo =[];



form.addEventListener("submit" ,async(e)=>{
    e.preventDefault();
    const userData = {
    title : todoTitle.value,
    todoDesc : todoDesc.value
}

try {
  const docRef = await addDoc(collection(db, "todos") ,userData)
  console.log("Document written with ID: ", docRef.id);
  allTodo.push({...userData , docId: docRef.id})
} catch (e) {
  console.error("Error adding document: ", e);
}
})


function renderTodo(arr){

}