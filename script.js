const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

let todoArray = [];

addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = localStorage.getItem("todo");
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo);
    }
    todoArray.push(text.value);
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
   });

   function searchh(){
     const keys = document.getElementById("key").value.toUpperCase();
     if(todoArray.indexOf(keys.value)== -1){
       return false;
     }
     else{
       for(var i=0; i<todoArray.length;i++){
        document.getElementById("key").innerHTML = todoArray.filter(keys);

       }
     }
   }

   function displayTodo() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
    todoArray.forEach((list, ind) => {
      htmlCode += `<div id='box'>
      <p style="width: 100%; ">${list}</p>
      <button onclick='edit(${ind})' style="padding: 0.5rem; 
      margin-right: 0.5rem; 
      margin-left: 1rem; 
      background-color: green; 
      color: #ffffff; 
      border-radius: 0.25rem; 
      border-width: 2px; ">Edit</button>
      
      <button onclick='deleteTodo(${ind})' style="padding: 0.5rem; 
      margin-left: 0.5rem; 
      background-color: red; 
      color: #ffffff; 
      border-radius: 0.25rem; 
      border-width: 2px;">Delete</button>
   </div>`;
    });
    listBox.innerHTML = htmlCode;
   }


   function deleteTodo(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(ind, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
   }

   function edit(ind) {
    saveInd.value = ind;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    text.value = todoArray[ind];
    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";
   }

   saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id] = text.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
   });
