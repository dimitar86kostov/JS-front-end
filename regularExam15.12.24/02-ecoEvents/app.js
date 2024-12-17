window.addEventListener("load", solve);

function solve() {
  let formElement = document.querySelector("form")
  let nextBtn = document.getElementById("next-btn");

  let previewList = document.getElementById("preview-list");
  let eventUL = document.getElementById("event-list");

  let emailInput = document.getElementById("email");
  let eventInput = document.getElementById("event");
  let locationInput = document.getElementById("location");

  nextBtn.addEventListener('click', onNext);

  function onNext() {

    let email = emailInput.value
    let event = eventInput.value
    let location = locationInput.value

    if (email == '' || event == '' || location == '') {
      return;
    }

    let li = createEl(email, event, location);

    previewList.appendChild(li);

    nextBtn.disabled = true;

    formElement.reset();



    function createEl(email, event, location) {

      let emailEl = document.createElement('h4');
      emailEl.textContent = email;



      let eventStrong = document.createElement('strong');
      eventStrong.textContent = 'Event:'
      let pEvent = document.createElement('p');
      pEvent.appendChild(eventStrong);
      pEvent.appendChild(document.createElement('br'));
      pEvent.appendChild(document.createTextNode(event));


      const locationParagraph = document.createElement('p');
      const locationStrong = document.createElement('strong');
      locationStrong.textContent = 'Location:';
      locationParagraph.appendChild(locationStrong);
      locationParagraph.appendChild(document.createElement('br'));
      locationParagraph.appendChild(document.createTextNode(location));


      let article = document.createElement('article');

      article.appendChild(emailEl);
      article.appendChild(pEvent);
      article.appendChild(locationParagraph);

      let editBtn = document.createElement('button');
      editBtn.classList.add('action-btn');
      editBtn.classList.add('edit');
      editBtn.textContent = 'edit';

      let applyBtn = document.createElement('button');
      applyBtn.classList.add('action-btn');
      applyBtn.classList.add('apply');
      applyBtn.textContent = 'apply';

      let liElement = document.createElement('li');
      liElement.classList.add('application')

      liElement.appendChild(article)
      liElement.appendChild(editBtn)
      liElement.appendChild(applyBtn)

      editBtn.addEventListener('click', () => {

        emailInput.value = email
        eventInput.value = event
        locationInput.value = location

        liElement.remove();

        nextBtn.disabled = false;

      });

      applyBtn.addEventListener('click', () => {

        liElement.remove();

        const newLi = document.createElement('li');
        newLi.classList.add('application')

        newLi.appendChild(article);

        eventUL.appendChild(newLi);

        nextBtn.disabled = false;
      });

      return liElement;

    }
  }
}
