const URL = 'http://localhost:3030/jsonstore/games/';

const loadBtn = document.getElementById('load-games');
const addGameBtn = document.getElementById("add-game");
const editGameBtn = document.getElementById("edit-game");
const formElement = document.querySelector('#form form');

const gameList = document.getElementById('games-list');

let nameInput = document.getElementById('g-name')
let typeInput = document.getElementById('type')
let playersInput = document.getElementById('players')



loadBtn.addEventListener('click', () => {

    loadGames();
});

addGameBtn.addEventListener('click', async () => {
    let name = nameInput.value;
    let type = typeInput.value;
    let players = playersInput.value;

    clearInputs();

    await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            type: type,
            players: players,
        }),
        headers: { 'Content-type': "aplication/json" }
    });

    await loadGames();
});

editGameBtn.addEventListener('click', editGame);

async function loadGames() {

    // clear game list
    gameList.innerHTML = '';

    // get request
    const response = await fetch(URL);
    const result = await response.json();
    const games = Object.values(result);

    // create game element
   const gameElements = games.map(game => createGame(game.name, game.type, game.players, game._id));

    // add to game list
    gameList.append(...gameElements);

    // edit button deactivated
    editGameBtn.setAttribute('disabled', 'disabled');
}

function createGame(name, type, players, gameId) {

    const pNameElement = document.createElement('p');
    pNameElement.textContent = name;
    const pTypeElement = document.createElement('p');
    pTypeElement.textContent = type;
    const pPlayersElement = document.createElement('p');
    pPlayersElement.textContent = players;

    const divContent = document.createElement('div');
    divContent.classList.add('content');

    divContent.appendChild(pNameElement);
    divContent.appendChild(pTypeElement);
    divContent.appendChild(pPlayersElement);


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

    const divBoardGame = document.createElement('div');
    divBoardGame.classList.add('board-game');

    divBoardGame.appendChild(divContent);
    divBoardGame.appendChild(divButtons);

    changeBtn.addEventListener('click', () => {

        nameInput.value = name;
        typeInput.value = type;
        playersInput.value = players;

        editGameBtn.removeAttribute('disabled');

        addGameBtn.setAttribute('disabled', 'disabled');

        // Set ID data attribute from form
        formElement.setAttribute("data-id", gameId);
    });

    deleteBtn.addEventListener('click', async () => {

        await fetch(`${URL}/${gameId}`, {
            method: 'DELETE',
        });
        await loadGames();
    });

    return divBoardGame;
}

async function editGame() {

    const gameId = formElement.getAttribute('data-id');

    let name = nameInput.value;
    let type = typeInput.value;
    let players = playersInput.value;

    clearInputs();

    await fetch(`${URL}/${gameId}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            type,
            players,
            _id: gameId,
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    await loadGames();

    // deactivate edit btn
    editGameBtn.setAttribute('disabled', 'disabled');

    // activate add btn
    addGameBtn.removeAttribute('disabled');

    // Remove dataset attribute from form (clear ID)
    formElement.removeAttribute('data-id');
};

function clearInputs() {

    nameInput.value = '';
    typeInput.value = '';
    playersInput.value = '';
}
