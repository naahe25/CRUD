//Validate Form Input Before Subbmitting Data
function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    if (name == "") {
      alert("Name Is Required");
      return false;
    }
    
    else if (age == "") {
      alert("Age Is Required");
      return false;
    }
    
    else if (age < 1) {
      alert("Age must not be 0 or less then zero");
      return false;
    }
    
    else if (address == "") {
      alert("Address is required");
      return false;
    }

    else if (email == "")
    {
        alert("Email is required");
        return false;
    }

    else if (!email.includes("@")) {
        alert("Invalid Email Address");
        return false;
    }

    return true;
    
}

//function to show data from local storage
function showDate() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
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

//Loads All Data from local storage When Document or Page Loaded
document.onload = showDate();

//Function to Add Data to local storage

function AddData() {
    //if form is validate
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

// function to delete data from local storage

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
