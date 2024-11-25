window.addEventListener("load", solve);

function solve() {
  let formElement = document.querySelector("form")
  let addBtn = document.getElementById("add-btn");

  let sureList = document.getElementById("sure-list");
  let eventUL = document.getElementById("scoreboard-list");

  let playerInput = document.getElementById("player");
  let scoreInput = document.getElementById("score");
  let roundInput = document.getElementById("round");

  addBtn.addEventListener('click', (e) => {
    // e.preventDefault();
    const player = playerInput.value;
    const score = scoreInput.value;
    const round = roundInput.value;

    if (player == '' || score == '' || round == '') {
      return;
    }
    // clearInputs();
    formElement.reset();


    const li = createElement(player, score, round);
    sureList.appendChild(li);

    addBtn.disabled = true;
  });

  function createElement(player, score, round) {

    let pPlayerElement = document.createElement("p");
    pPlayerElement.textContent = player;

    let pScoreElement = document.createElement("p");
    pScoreElement.textContent = `Score: ${score}`;

    let pRoundElement = document.createElement("p");
    pRoundElement.textContent = `Round: ${round}`;

    let articleElement = document.createElement('article');

    articleElement.appendChild(pPlayerElement);
    articleElement.appendChild(pScoreElement);
    articleElement.appendChild(pRoundElement);

    let divButtons = document.createElement("div");
    divButtons.classList.add("buttons");

    let editBtn = document.createElement("button");
    editBtn.classList.add("btn");
    editBtn.classList.add("edit");
    editBtn.textContent = "Edit";

    let okBtn = document.createElement("button");
    okBtn.classList.add("btn");
    okBtn.classList.add("ok");
    okBtn.textContent = "Ok";

    divButtons.appendChild(editBtn);
    divButtons.appendChild(okBtn);

    let liEl = document.createElement('li');
    liEl.classList.add('dart-item')

    liEl.appendChild(articleElement);
    liEl.appendChild(divButtons);

    editBtn.addEventListener('click', () => {
      playerInput.value = player;
      scoreInput.value = score;
      roundInput.value = round;

      liEl.remove();
      addBtn.removeAttribute('disabled');
    })

    okBtn.addEventListener('click', () => {

      liEl.remove();

      let clearBtn = document.createElement('button');
      clearBtn.classList.add('btn');
      clearBtn.classList.add('clear');
      clearBtn.textContent = "Clear";

      let liEventEl = document.createElement('li');

      liEventEl.appendChild(articleElement);
      liEventEl.appendChild(clearBtn);

      eventUL.appendChild(liEventEl);

      addBtn.removeAttribute('disabled');

      clearBtn.addEventListener('click', (e) => {

        e.target.parentElement.remove();
      })
    })


    return liEl;
  }

  function clearInputs() {
    playerInput.value = '';
    scoreInput.value = '';
    roundInput.value = '';
  }
}
