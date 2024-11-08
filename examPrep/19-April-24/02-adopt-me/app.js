window.addEventListener("load", solve);

function solve() {
  const formElement = document.querySelector("form");

  const checkInfo = document.getElementById("adoption-info");
  const adoptedPets = document.getElementById("adopted-list");

  const addBtn = document.getElementById("adopt-btn");

  const typeInput = document.getElementById("type");
  const ageInput = document.getElementById("age");
  const genderInput = document.getElementById("gender");

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const type = typeInput.value;
    const gender = genderInput.value;
    const age = Number(ageInput.value);

    if (type == '' || gender == '' || age == '') {
      return;
    }

    const liElement = createCheckList(type, gender, age);

    checkInfo.appendChild(liElement);

    formElement.reset();
  });

  function createCheckList(type, gender, age) {

    const pTypeElement = document.createElement("p");
    pTypeElement.textContent = `Pet:${type}`;

    const pGenderElement = document.createElement("p");
    pGenderElement.textContent = `Gender:${gender}`;

    const pAgeElement = document.createElement("p");
    pAgeElement.textContent = `Age:${age}`;

    const articleElement = document.createElement("article");

    articleElement.appendChild(pTypeElement)
    articleElement.appendChild(pGenderElement)
    articleElement.appendChild(pAgeElement)

    const editBtn = document.createElement("button");
    editBtn.classList.add('edit-btn');
    editBtn.textContent = "Edit"

    const doneBtn = document.createElement("button");
    doneBtn.classList.add('done-btn');
    doneBtn.textContent = "Done"

    const divBtnsElement = document.createElement("div");
    
    divBtnsElement.appendChild(editBtn);
    divBtnsElement.appendChild(doneBtn);

    const liElement = document.createElement("li");

    liElement.appendChild(articleElement);
    liElement.appendChild(divBtnsElement)


    editBtn.addEventListener('click', () => {

      typeInput.value = type;
      ageInput.value = age;
      genderInput.value = gender;

      liElement.remove();
    });

    doneBtn.addEventListener('click', () => {   
      
      divBtnsElement.remove();
      
      const clearBtn = document.createElement('button');
      clearBtn.classList.add('clear-btn');
      clearBtn.textContent = 'Clear';
      
      liElement.appendChild(articleElement);
      liElement.appendChild(clearBtn);
      
      adoptedPets.appendChild(liElement);

      clearBtn.addEventListener('click', (e) => {
        e.target.parentElement.remove();
       
      });
    });
    return liElement

  }
}
