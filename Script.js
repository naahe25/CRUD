// Validate Form Input Before Submitting Data
function validateForm() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var email = document.getElementById("email").value;

  if (name == "") {
      alert("Name Is Required");
      return false;
  } else if (age == "") {
      alert("Age Is Required");
      return false;
  } else if (age < 1) {
      alert("Age must not be 0 or less than zero");
      return false;
  } else if (address == "") {
      alert("Address is required");
      return false;
  } else if (email == "") {
      alert("Email is required");
      return false;
  } else if (!email.includes("@")) {
      alert("Invalid Email Address");
      return false;
  }
  return true;
}

// Function to show data from local storage
function showDate() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
  } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  
  var html = "";

  peopleList.forEach(function (element, index) {
      html += "<tr>";
      html += "<td>" + element.name + "</td>";
      html += "<td>" + element.age + "</td>";
      html += "<td>" + element.address + "</td>";
      html += "<td>" + element.email + "</td>";
      html +=
          '<td><button onclick="deleteData(' +
          index + ')" class="btn btn-danger">Delete</button><button onclick = "updateData(' +index+ ')" class="btn btn-warning m-2" > Edit </button ></td> ';
      html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

// Loads All Data from local storage When Document or Page Loaded
document.onload = showDate();

// Function to Add Data to local storage
function AddData() {
  if (validateForm() == true) {
      var name = document.getElementById("name").value;
      var age = document.getElementById("age").value;
      var address = document.getElementById("address").value;
      var email = document.getElementById("email").value;

      var peopleList;
      if (localStorage.getItem("peopleList") == null) {
          peopleList = [];
      } else {
          peopleList = JSON.parse(localStorage.getItem("peopleList"));
      }

      peopleList.push({
          name: name,
          age: age,
          address: address,
          email: email,
      });
      
      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showDate();
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("address").value = "";
      document.getElementById("email").value = "";
  }
}

// Function to delete data from local storage
function deleteData(index) {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
  } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1); 
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showDate();
}

// Function to update/edit data from local storage
function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";
  
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
  } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("age").value = peopleList[index].age;
  document.getElementById("address").value = peopleList[index].address;
  document.getElementById("email").value = peopleList[index].email;

  document.querySelector("#Update").onclick = function () {
      if (validateForm() == true) {
          peopleList[index].name = document.getElementById("name").value;
          peopleList[index].age = document.getElementById("age").value;
          peopleList[index].address = document.getElementById("address").value;
          peopleList[index].email = document.getElementById("email").value;

          localStorage.setItem("peopleList", JSON.stringify(peopleList));

          showDate();

          document.getElementById("name").value = "";
          document.getElementById("age").value = "";
          document.getElementById("address").value = "";
          document.getElementById("email").value = "";

          document.getElementById("Submit").style.display = "block";
          document.getElementById("Update").style.display = "none";
      }
  }
}

// To-Do List Functions
function addTodo() {
  var todoInput = document.getElementById("todoInput");
  var task = todoInput.value.trim();
  if (task === "") {
      alert("Task cannot be empty");
      return;
  }

  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(task);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoInput.value = "";
  renderTodoList();
}

function renderTodoList() {
  var todoList = document.getElementById("todoList");
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  todoList.innerHTML = "";

  todos.forEach((task, index) => {
      var listItem = document.createElement("li");
      listItem.className = "list-group-item todo-item";
      listItem.innerHTML = `
          ${task}
          <button class="btn btn-danger btn-sm float-end" onclick="removeTodo(${index})">Delete</button>
      `;
      todoList.appendChild(listItem);
  });
}

function removeTodo(index) {
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodoList();
}

// Initial call to render the todo list on page load
document.onload = renderTodoList();
