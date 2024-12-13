const baseUrl = 'http://localhost:3030/jsonstore/grocery/';

const loadBtn = document.getElementById('load-product');
const addProductBtn = document.getElementById("add-product");
const updateProdutBtn = document.getElementById("update-product");
const formElement = document.querySelector('#addForm form');

const list = document.getElementById('tbody');

let productInput = document.getElementById('product')
let countInput = document.getElementById('count')
let priceInput = document.getElementById('price')

loadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadProducts();
});

addProductBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addProducts();
});

updateProdutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    updateProdut();
});

async function loadProducts() {
    // clear list
    list.innerHTML = '';

    // get request
    const response = await fetch(baseUrl);
    const result = await response.json();
    const products = Object.values(result);
    console.log(products);


    products.forEach(line => {

        const { count, price, product, _id } = line;

        const tr = createElement(count, price, product, _id);

        list.appendChild(tr);
    })

    function createElement(count, price, product, id) {

        const tdName = document.createElement('td');
        tdName.classList.add('name');
        tdName.textContent = product;

        const tdCount = document.createElement('td');
        tdCount.classList.add('count-product');
        tdCount.textContent = count;

        const tdPrice = document.createElement('td');
        tdPrice.classList.add('product-price');
        tdPrice.textContent = price;

        const tdBtn = document.createElement('td');
        tdBtn.classList.add('btn');

        const updateBtn = document.createElement('button');
        updateBtn.classList.add('update');
        updateBtn.textContent = 'Update';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.textContent = 'Delete';

        tdBtn.appendChild(updateBtn);
        tdBtn.appendChild(deleteBtn);

        const tr = document.createElement('tr');

        tr.appendChild(tdName);
        tr.appendChild(tdCount);
        tr.appendChild(tdPrice);
        tr.appendChild(tdBtn);

        updateBtn.addEventListener('click', () => {

            productInput.value = product
            countInput.value = count
            priceInput.value = price

            formElement.setAttribute('data-id', id);

            tr.remove();

            // updateProdutBtn.removeAttribute('disabled')

            updateProdutBtn.disabled = false;
            addProductBtn.disabled = true;

        });

        deleteBtn.addEventListener('click', async () => {

            await fetch(baseUrl + id, {

                method: 'DELETE'
            })

            loadProducts();
        });

        return tr;
    }
}

async function addProducts() {
    const product = productInput.value
    const count = countInput.value
    const price = priceInput.value

    formElement.reset();

    await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({
            product, count, price
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    loadProducts()
}

async function updateProdut() {
    const product = productInput.value
    const count = countInput.value
    const price = priceInput.value

    const id = formElement.getAttribute('data-id');

    await fetch(baseUrl + id, {
        method: "PUT",
        body: JSON.stringify({
            product, count, price
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    loadProducts();

    updateProdutBtn.disabled = true;
    addProductBtn.disabled = false;

    formElement.reset();

    formElement.removeAttribute('data-id');
}
