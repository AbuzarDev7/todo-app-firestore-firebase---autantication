import { 
  collection, addDoc, Timestamp, getDocs, query, orderBy, 
  deleteDoc, updateDoc, doc 
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js"; 
import { db } from "./config.js";

const form = document.querySelector("#form");
const todoTitle = document.querySelector("#todo-title");
const todoDesc = document.querySelector("#todo-desc");
const container = document.querySelector("#container");

// push all todo in array 
let allTodo = [];

async function getDataFromDB() {
  // resighn all todo save id 
  allTodo = [];
  const q = query(collection(db, "todos"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docSnap) => {
    // docsnap doc id userpush in array 
    allTodo.push({ ...docSnap.data(), docId: docSnap.id });
  });
  renderTodo(allTodo);
}

getDataFromDB();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    title: todoTitle.value,
    todoDesc: todoDesc.value,
    time: Timestamp.fromDate(new Date()),
  };

  try {
    const docRef = await addDoc(collection(db, "todos"), userData);
    console.log("Document written with ID:", docRef.id);
    allTodo.push({ ...userData, docId: docRef.id });
    renderTodo(allTodo);
  } catch (e) {
    console.error("Error adding document:", e);
  }
});

function renderTodo(arr) {
  container.innerHTML = "";

  arr.forEach((item, index) => {
    //creat div dom createlemnt
    const div = document.createElement("div");
    //creat div class add dom
    div.classList.add("todo-card");
    div.innerHTML = `
      <div class="todo-title">${item.title}</div>
      <div class="todo-desc">${item.todoDesc}</div>
      <div class="todo-actions">
        <button class="btn btn-edit">✏️ Edit</button>
        <button class="btn btn-delete">🗑️ Delete</button>
      </div>
    `;

    // Delete button
    div.querySelector(".btn-delete").addEventListener("click", async () => {
      try {
        await deleteDoc(doc(db, "todos", item.docId));
        console.log("Data deleted:", item.title);
        allTodo.splice(index, 1);
        renderTodo(allTodo);
      } catch (err) {
        console.error("Error deleting:", err);
      }
    });

    
    div.querySelector(".btn-edit").addEventListener("click", async () => {
      // save in varible title and dec 
      const newTitle = prompt("Enter new title", item.title);
      const newDesc = prompt("Enter new description", item.todoDesc);

      if (newTitle && newDesc) {
        const todoRef = doc(db, "todos", item.docId);
        await updateDoc(todoRef, { title: newTitle, todoDesc: newDesc });
        console.log("Data updated:", item.docId);
        allTodo[index].title = newTitle;
        allTodo[index].todoDesc = newDesc;
        renderTodo(allTodo);
      }
    });
// container inner using dom appenchild 
    container.appendChild(div);
  });
}
