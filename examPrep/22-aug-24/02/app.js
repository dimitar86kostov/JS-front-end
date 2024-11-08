window.addEventListener("load", solve);

function solve() {
  let formElement = document.querySelector("form");
  let laptopModelInput = document.getElementById("laptop-model");
  let storageInput = document.getElementById("storage");
  let priceInput = document.getElementById("price");
  let clearBtn = document.querySelector(".clear")
  let addBtn = document.getElementById("add-btn");
  addBtn.addEventListener("click", publish);

  function publish() {
    if (
      laptopModelInput.value == "" ||
      storageInput.value == "" ||
      priceInput.value == ""
    ) {
      return;
    }
    let reviewList = document.getElementById("check-list");
    let laptopList = document.getElementById("laptops-list");

    let laptopLi = document.createElement("li");
    laptopLi.classList.add("laptop-item");

    let taskArticleElement = document.createElement("article");

    let titleHeadingElement = document.createElement("p");
    titleHeadingElement.textContent = laptopModelInput.value;
    let laptopTitle = laptopModelInput.value;
    
    let memoryElement = document.createElement("p");
    memoryElement.textContent = `Memory: ${storageInput.value} TB`;
    let storage = storageInput.value;

    let priceElement = document.createElement("p");
    priceElement.textContent = `Price: ${priceInput.value}$`;
    let price = priceInput.value;

    taskArticleElement.appendChild(titleHeadingElement);
    taskArticleElement.appendChild(memoryElement);
    taskArticleElement.appendChild(priceElement);

    let editBtn = document.createElement("button");
    editBtn.classList.add("btn");
    editBtn.classList.add("edit");
    editBtn.textContent = "edit";
    editBtn.addEventListener("click", edit);

    let postBtn = document.createElement("button");
    postBtn.classList.add("btn");
    postBtn.classList.add("ok");
    postBtn.textContent = "ok";
    postBtn.addEventListener("click", post);

    laptopLi.appendChild(taskArticleElement);
    laptopLi.appendChild(editBtn);
    laptopLi.appendChild(postBtn);

    reviewList.appendChild(laptopLi);
    formElement.reset();
    addBtn.disabled = true;

    function edit() {
      laptopModelInput.value = laptopTitle;
      storageInput.value = storage;
      priceInput.value = price;

      reviewList.removeChild(laptopLi);
      addBtn.disabled = false;
    }

    function post() {
      reviewList.removeChild(laptopLi);
      laptopLi.removeChild(postBtn);
      laptopLi.removeChild(editBtn);
      laptopList.appendChild(laptopLi);
      addBtn.disabled = false;

      clearBtn.addEventListener("click", onClear)

      function onClear() {
        location.reload();
      }
    }
  }
}
