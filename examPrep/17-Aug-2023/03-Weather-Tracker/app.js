const baseUrl = 'http://localhost:3030/jsonstore/tasks';
const baseList = document.querySelector('.container')

const loadBtn = document.getElementById('load-history');
const addBtn = document.getElementById("add-weather");
const editBtn = document.getElementById("edit-weather");
const formElement = document.querySelector('#form form');

const list = document.getElementById('list');

let locationInput = document.getElementById('location')
let temperatureInput = document.getElementById('temperature')
let dateInput = document.getElementById('date')

loadBtn.addEventListener('click', () => {

    loadHistory();
});

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addHistory();
});

editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    editHistory();
});

async function loadHistory() {
    // clear list
    list.innerHTML = '';

    // get request
    const response = await fetch(baseUrl);
    const result = await response.json();
    const history = Object.values(result);
    console.log(history);


    history.forEach(his => {

        const { location, temperature, date, _id } = his;

        const div = createElement(location, temperature, date, _id);

        list.appendChild(div);
    });

    function createElement(location, temperature, date, histId) {

        const changeBtn = document.createElement('button');
        changeBtn.classList.add('change-btn');
        changeBtn.textContent = 'Change';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';

        const divButtons = document.createElement('div');
        divButtons.classList.add('buttons-container');

        divButtons.appendChild(changeBtn);
        divButtons.appendChild(deleteBtn);

        const h2LocationElement = document.createElement('h2')
        h2LocationElement.textContent = location;

        const h3DateElement = document.createElement('h3')
        h3DateElement.textContent = date;

        const h3TemperatureElement = document.createElement('h3')
        h3TemperatureElement.setAttribute('id', 'celsius');
        h3TemperatureElement.textContent = temperature;


        const divContainer = document.createElement('div');
        divContainer.classList.add('container');

        divContainer.appendChild(h2LocationElement);
        divContainer.appendChild(h3DateElement);
        divContainer.appendChild(h3TemperatureElement);
        divContainer.appendChild(divButtons);

        changeBtn.addEventListener('click', () => {

            locationInput.value = location;
            temperatureInput.value = temperature;
            dateInput.value = date;

            divContainer.remove();
console.log(histId);

            formElement.setAttribute('data-id', histId);
            editBtn.disabled = false;
            addBtn.disabled = true;
        });

        deleteBtn.addEventListener('click', async () => {

            await fetch(`${baseUrl}/${histId}`, {
                method: 'DELETE',
            });
            await loadHistory();
        });

        return divContainer;
    }
};

async function addHistory() {
    const location = locationInput.value
    const temperature = temperatureInput.value
    const date = dateInput.value

    clearInputs();

    await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({
            location, temperature, date
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    loadHistory()
}

async function editHistory() {
    const location = locationInput.value
    const temperature = temperatureInput.value
    const date = dateInput.value

    const id = formElement.getAttribute('data-id');

    await fetch(baseUrl + '/' + id, {
        method: "PUT",
        body: JSON.stringify({
            location, temperature, date
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    loadHistory();

    editBtn.disabled = true;
    addBtn.disabled = false;

    clearInputs();

    formElement.removeAttribute('data-id');
}


function clearInputs() {

    locationInput.value = ''
    temperatureInput.value = ''
    dateInput.value = ''
}
