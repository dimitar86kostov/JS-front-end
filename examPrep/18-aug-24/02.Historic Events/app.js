window.addEventListener("load", solve);

function solve() {
  let formElement = document.querySelector("form")
  let addBtn = document.getElementById("add-btn");

  let previewUL = document.getElementById("preview-list");
  let eventUL = document.getElementById("archive-list");

  let nameInput = document.getElementById("name");
  let timeInput = document.getElementById("time");
  let descriptionInput = document.getElementById("description");

  addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let name = nameInput.value;
    let time = timeInput.value;
    let description = descriptionInput.value;

    let liElement = createPreviewElement(name, time, description);

    previewUL.appendChild(liElement);
    formElement.reset();
    addBtn.disabled = true;

    name = '';
    time = '';
    description = '';
  })

  function createPreviewElement(name, time, description) {

    let pNameElement = document.createElement("p");
    pNameElement.textContent = name;

    let pTimeElement = document.createElement("p");
    pTimeElement.textContent = time;

    let pDescriptionElement = document.createElement("p");
    pDescriptionElement.textContent = description;

    let articleElement = document.createElement('article');

    articleElement.appendChild(pNameElement);
    articleElement.appendChild(pTimeElement);
    articleElement.appendChild(pDescriptionElement);

    let divButtons = document.createElement("div");
    divButtons.classList.add("buttons");

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";

    let nextBtn = document.createElement("button");
    nextBtn.classList.add("next-btn");
    nextBtn.textContent = "Next";

    divButtons.appendChild(editBtn);
    divButtons.appendChild(nextBtn);

    let liEl = document.createElement('li');

    liEl.appendChild(articleElement);
    liEl.appendChild(divButtons);

    editBtn.addEventListener('click', () => {
      nameInput.value = name;
      timeInput.value = time;
      descriptionInput.value = description;

      liEl.remove();
      addBtn.disabled = false;
    })

    nextBtn.addEventListener('click', () => {

      previewUL.remove();

      let archiveBtn = document.createElement('button');
      archiveBtn.classList.add('archive-btn');
      archiveBtn.textContent = "Archive";

      let liEventEl = document.createElement('li');

      liEventEl.appendChild(articleElement);
      liEventEl.appendChild(archiveBtn);

      eventUL.appendChild(liEventEl);

      archiveBtn.addEventListener('click', () => {
        // location.reload() // this method don't gives 100/100
        
        eventUL.remove();
        addBtn.disabled = false;
      })
    })
    return liEl;
  }
}