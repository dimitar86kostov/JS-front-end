const baseUrl = 'http://localhost:3030/jsonstore/workout/';

const loadBtn = document.getElementById('load-workout');
const addBtn = document.getElementById("add-workout");
const editBtn = document.getElementById("edit-workout");
const formElement = document.querySelector('#form form');

const list = document.getElementById('list');

let workoutInput = document.getElementById('workout')
let locationInput = document.getElementById('location')
let dateInput = document.getElementById('date')

loadBtn.addEventListener('click', loadWorkout);

addBtn.addEventListener('click', addWorkout);

editBtn.addEventListener('click', editWorkout);

async function loadWorkout() {
    // clear list
    list.innerHTML = '';

    // get request
    const response = await fetch(baseUrl);
    const result = await response.json();
    const workout = Object.values(result);
    console.log(workout);


    workout.forEach(work => {

        const { workout, location, date, _id } = work;

        const div = createElement(workout, location, date, _id);

        list.appendChild(div);
    });

    function createElement(workout, location, date, id) {

        const h2Name = document.createElement('h2');
        h2Name.textContent = workout;

        const h3Date = document.createElement('h3');
        h3Date.textContent = date;

        const h3Location = document.createElement('h3');
        h3Location.setAttribute('id', 'location')
        h3Location.textContent = location;

        const div = document.createElement('div');
        div.classList.add('container');

        div.appendChild(h2Name);
        div.appendChild(h3Date);
        div.appendChild(h3Location);

        const divButtons = document.createElement('div');
        divButtons.setAttribute('id', 'buttons-container')

        const changeBtn = document.createElement('button');
        changeBtn.classList.add('change-btn');
        changeBtn.textContent = 'Change';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';

        divButtons.appendChild(changeBtn);
        divButtons.appendChild(deleteBtn);

        div.appendChild(divButtons);

        changeBtn.addEventListener('click', () => {

            workoutInput.value = workout;
            locationInput.value = location;
            dateInput.value = date;

            div.remove();

            formElement.setAttribute('data-id', id);

            editBtn.disabled = false;
            addBtn.disabled = true;
        });

        deleteBtn.addEventListener('click', async () => {

            await fetch(baseUrl + id, {
                method: 'DELETE',
            });
            await loadWorkout();
        });

        return div;
    }
}

async function addWorkout() {
    const workout = workoutInput.value
    const location = locationInput.value
    const date = dateInput.value

    formElement.reset();

    await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({
            workout, location, date
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    loadWorkout();
}

async function editWorkout() {
    const workout = workoutInput.value
    const location = locationInput.value
    const date = dateInput.value

    const id = formElement.getAttribute('data-id');

    await fetch(baseUrl + id, {
        method: "PUT",
        body: JSON.stringify({
            workout, location, date
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    loadWorkout();

    editBtn.disabled = true;
    addBtn.disabled = false;

    formElement.reset();

    formElement.removeAttribute('data-id');
}
