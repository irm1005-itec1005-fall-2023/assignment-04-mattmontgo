/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */

const inputBox = document.getElementById("todoInput");
const addButton = document.querySelector(".btn");
const todoList = document.getElementById("todoList");
const todoCount = document.querySelector(".todoCount span");
const doneCount = document.querySelector(".doneCount span");
const clearButton = document.querySelector(".clearBtn");

addButton.addEventListener("click", function(){
  addTask();
});

inputBox.addEventListener("keypress", function(e){
  if (e.key === "Enter") {
    addTask();
  }
});

todoList.addEventListener("click", function(e){
  const target = e.target;
  if (target.type === "checkbox"){
    toggleTaskStatus(target);
  }
  if (target.classList.contains("deleteTask")){
    deleteTask(target.parentElement);
  }
});

clearButton.addEventListener("click", function(){
  clearAllTasks();
});

function addTask(){
  const taskText = inputBox.value;
  if (taskText !== ""){
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const taskTextSpan = document.createElement("span");
    const deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    taskTextSpan.textContent = taskText;
    deleteButton.textContent = "\u00d7";
    deleteButton.classList.add("deleteTask");

    listItem.appendChild(checkbox);
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(deleteButton);

    todoList.prepend(listItem);

    inputBox.value = "";
    
    updateTaskCount();
  }
  else{
    alert("These aren't the droids your looking for!!")
  }
}
function toggleTaskStatus(checkbox){
  const listItem = checkbox.parentElement;
  listItem.classList.toggle("completed");
  if (listItem.classList.contains("completed")){
    todoList.appendChild(listItem);
  }else{
    todoList.prepend(listItem, todoList.firstChild);
  }
  updateTaskCount();
  saveCheckbox();
}
function saveCheckbox(){
  const checkboxStates = Array.from(todoList.querySelectorAll('input[type="checkbox"]')).map(checkbox => checkbox.checked);
  localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
}
function LoadCheckbox(){
  const checkboxStates = JSON.parse(localStorage.getItem("checkboxStates")) || [];
  const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = checkboxStates[index] || false;
    if (checkboxStates[index]) {
      const listItem = checkbox.parentElement;
      listItem.classList.add("completed");
      todoList.appendChild(listItem);
    }
  });
}
function deleteTask(listItem){
  listItem.remove();
  updateTaskCount();
}
function clearAllTasks(){
  todoList.innerHTML = "";
  updateTaskCount();
}
function updateTaskCount(){
  const totalTasks = todoList.children.length;
  const completedTasks = document.querySelectorAll(".completed").length;
  todoCount.textContent = totalTasks - completedTasks;
  doneCount.textContent = completedTasks;
}
 function saveList(){
  localStorage.setItem("todoList", todoList.innerHTML);
}
function loadList(){
  todoList.innerHTML = localStorage.getItem("todoList");
  LoadCheckbox();
  updateTaskCount();
}
loadList();
window.addEventListener("beforeunload", function(){
  saveList();
}); 
