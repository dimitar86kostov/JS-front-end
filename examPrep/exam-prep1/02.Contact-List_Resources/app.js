window.addEventListener("load", solve);

function solve() {
    let formElement = document.querySelector("form");
    let nameElement = document.getElementById("name");
    let phoneElement = document.getElementById("phone");
    let categoryElement = document.getElementById("category");
  
    let addButton = document.getElementById("add-btn");
    addButton.addEventListener("click", onAdd);
  
    function onAdd() {
      if (
        nameElement.value == "" ||
        phoneElement.value == "" ||
        categoryElement.value == ""
      ) {
        return;
      }
      let taskList = document.getElementById("check-list");
      let doneList = document.getElementById("contact-list");
  
      let taskLiElement = document.createElement("li"); 
      let buttonDiv = document.createElement("div"); 
      buttonDiv.setAttribute("class", "buttons")
      let taskArticleElement = document.createElement("article");

      let nameP = document.createElement("p");
      nameP.textContent = `name:${nameElement.value}`;
      let name = nameElement.value;
    
  
      let phoneP = document.createElement("p");
      phoneP.textContent = `phone:${phoneElement.value}`;
      let phone = phoneElement.value;
  
      let categoryP = document.createElement("p");
      categoryP.textContent = `category:${categoryElement.value}`;
      let category = categoryElement.value;
    
  
      taskArticleElement.appendChild(nameP);
      taskArticleElement.appendChild(phoneP);
      taskArticleElement.appendChild(categoryP);
  
      let editBtn = document.createElement("button");
      editBtn.setAttribute("class", "edit-btn")
      editBtn.addEventListener("click", edit);
  
      let doneBtn = document.createElement("button");
      doneBtn.setAttribute("class", "save-btn")
      doneBtn.addEventListener("click", onDone);

      buttonDiv.appendChild(editBtn);
      buttonDiv.appendChild(doneBtn);
  
      taskLiElement.appendChild(taskArticleElement);
      taskLiElement.appendChild(buttonDiv);

      
  
      taskList.appendChild(taskLiElement);
      formElement.reset();
  
      function edit() {
        nameElement.value = name;
        phoneElement.value = phone;
        categoryElement.value = category;
  
        taskList.removeChild(taskLiElement);
      }
  function onDone() {
    let taskDoneLiElement = document.createElement("li"); 
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "del-btn")
    deleteBtn.addEventListener("click", onDelete);
    taskDoneLiElement.appendChild(taskArticleElement);
    taskDoneLiElement.appendChild(deleteBtn);
    doneList.appendChild(taskDoneLiElement);
    taskList.removeChild(taskLiElement);


    function onDelete() {
      doneList.removeChild(taskDoneLiElement);
      
    }
  }
      
    }
  }
  