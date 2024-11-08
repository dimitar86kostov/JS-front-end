window.addEventListener("load", solve);

function solve() {

  let formElement = document.querySelector("form");
  let nameInput = document.getElementById("name");
  let phoneInput = document.getElementById("phone");
  let categoryInput = document.getElementById("category");
  let addBtn = document.getElementById("add-btn");

  addBtn.addEventListener("click", publish);

  function publish() {
    if (
      nameInput.value == "" ||
      phoneInput.value == "" ||
      categoryInput.value == ""
    ) {
      return;
    }

    let checkListUL = document.getElementById("check-list");
    let contactListUL = document.getElementById("contact-list");

    let liElement = document.createElement("li");
    liElement.classList.add("check-item");

    let articleElement = document.createElement("article");

    let contactNameElement = document.createElement("p");
    contactNameElement.textContent = `name:${nameInput.value}`;
    let nameTitle = nameInput.value;

    let phoneElement = document.createElement("p");
    phoneElement.textContent = `phone:${phoneInput.value}`;
    let phoneNum = phoneInput.value;

    let categoryElement = document.createElement("p");
    categoryElement.textContent = `category:${categoryInput.value}`;
    let category = categoryInput.value;

    articleElement.appendChild(contactNameElement);
    articleElement.appendChild(phoneElement);
    articleElement.appendChild(categoryElement);

    let divBtnsElement = document.createElement("div");
    divBtnsElement.classList.add("buttons")

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", edit);

    let saveBtn = document.createElement("button");
    saveBtn.classList.add("save-btn");
    saveBtn.addEventListener("click", save);

    divBtnsElement.appendChild(editBtn);
    divBtnsElement.appendChild(saveBtn);

    liElement.appendChild(articleElement);
    liElement.appendChild(divBtnsElement);


    checkListUL.appendChild(liElement);
    formElement.reset();
    addBtn.disabled = true;

    function edit() {
      nameInput.value = nameTitle;
      phoneInput.value = phoneNum
      categoryInput.value = category

      checkListUL.removeChild(liElement);
      addBtn.disabled = false;
    }

    function save() {
      // checkListUL.removeChild(liElement);

      // let contactLiElement = document.createElement("li");
      // contactLiElement.classList.add("contact-item");

      divBtnsElement.remove();

      let deleteBtn = document.createElement("button")
      deleteBtn.classList.add("del-btn");

      // liElement.appendChild(articleElement);

      liElement.appendChild(deleteBtn);

      contactListUL.appendChild(liElement);
      addBtn.disabled = false;

      deleteBtn.addEventListener("click", onDelete)

      function onDelete() {
        location.reload();
      }
    }
  }

}
