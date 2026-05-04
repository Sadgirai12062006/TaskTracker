let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
  let filter = window.currentFilter || "all";
  let search = document.getElementById("searchInput").value.toLowerCase();
  search = search.trim();
  let list = document.getElementById("taskList");list.innerHTML = "";

  tasks.forEach(function(task, index) {
  console.log("search:",search);
  console.log("Task:",task.text);  
  if(search &&! task.text.toLowerCase().includes(search))
  {
    return;
  }  
  if(filter === "completed" && !task.done)   
  return;
  if (filter === "pending" && task.done)  
  return; 
    let li = document.createElement("li");
    li.setAttribute("data-index", index);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.onclick = function (e) {
       e.stopPropagation();
       tasks[index].done = checkbox.checked;
       saveTasks();
    };
    // text ke liye span
    let textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    li.setAttribute("data-index",task.text.toLowerCase())

    if (task.done) {
      textSpan.style.textDecoration = "line-through";
    }

    // complete toggle
    li.onclick = function () {
      tasks[index].done = !tasks[index].done;
      saveTasks();
    };
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function(e) {
      e.stopPropagation();

      let newText = prompt("Edit your task:", tasks[index].text);

      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        saveTasks();
      }
    };

    // delete button
    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = function (e) {
      e.stopPropagation();
      tasks = tasks.filter(function(_, i){
        return i !== index;
      });
      saveTasks();
    };
    
    // buttons ke liye div
    let btnDiv = document.createElement("div");

    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(btn);

    // final structure
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(btnDiv);

    list.appendChild(li);
      });
    } 
  let pending = tasks.filter(task => !task.done).length;
  let completed = tasks.filter(task => task.done).length;

  document.getElementById("taskCount").textContent =pending + " Pending | " + completed + " Completed"; 

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value;

  if (text === "") return;

  tasks.push({ text: text, done: false });
  input.value = "";

  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

showTasks();

function filterTasks(type) {
    window.currentFilter = type;
    showTasks();
}


function toggleDarkMode() {
  document.body.classList.toggle("dark");
}