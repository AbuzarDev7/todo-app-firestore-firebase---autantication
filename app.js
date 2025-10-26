// console.log("hell world");

import { collection, addDoc,Timestamp,getDocs,query ,orderBy} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js"; 
import { db } from "./config.js";
const form = document.querySelector("#form");
const todoTitle = document.querySelector("#todo-title");
const todoDesc = document.querySelector("#todo-desc");
const container = document.querySelector("#container")
let allTodo =[];

async function getDataFromDB() {
  const q = query(collection(db, "todos"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allTodo.push({ ...doc.data(), docid: doc.id });
  });
  console.log(allTodo);
  renderTodo(allTodo);
}

getDataFromDB();


form.addEventListener("submit" ,async(e)=>{
    e.preventDefault();
    const userData = {
    title : todoTitle.value,
    todoDesc : todoDesc.value,
        time: Timestamp.fromDate(new Date()),
}




try {
  const docRef = await addDoc(collection(db, "todos") ,userData)
  console.log("Document written with ID: ", docRef.id);
  allTodo.push({...userData , docId: docRef.id})
  renderTodo(allTodo)
} catch (e) {
  console.error("Error adding document: ", e);
}
})


function renderTodo(arr){
  container.innerHTML = "";
arr.map((item,index)=>{
  container.innerHTML += ` <div class="todo-card">
    <div class="todo-title">${item.title}</div>
    <div class="todo-desc">${item.todoDesc}</div>
    <div class="todo-actions">
      <button class="btn btn-edit">✏️ Edit</button>
      <button onclick="deleteFnc(${index})" class="btn btn-delete">🗑️ Delete</button>

    </div>
  </div>`
})
}

window.deleteFnc =function(index){
  allTodo.splice(index,1)
  renderTodo(allTodo)
}
