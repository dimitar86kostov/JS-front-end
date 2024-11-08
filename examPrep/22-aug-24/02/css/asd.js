document.body.innerHTML =`
 <h1>New Laptop Wishlist</h1>
    <main id="main">
      <div>
        <div id="form-container" >

          <form class="laptop-info">
            <h1>Add Laptop</h1>
           
            <input type="text" placeholder="Laptop Model" id="laptop-model" />
 
            <input type="number" placeholder="Storage Space" id="storage" />

            <input type="number" placeholder="Price" id="price">

            <button type="button" id="add-btn">Add</button>
          </form>
        </div>
      </div>

      <div id="check-list-container">
        <div>
          <div class="pc some ">
            <h2>Last Check:</h2>
            <ul id="check-list"></ul>
          </div>
        </div>
        <div id="laptops-container">
          <div>
            <div class="pc some wishlist">
              <h2>Wishlist:</h2>
              <ul id="laptops-list"></ul>
              <button class="btn clear">Clear</button>
            </div>
          </div>
        </div>
      </div>
        </main>
        <script src="./app.js"></script>
`
result();
const addLaptop = {
        model: () => document.getElementById("laptop-model"),
        storage: () => document.getElementById("storage"),
        price: () => document.getElementById("price"),
        addBtn: () => document.getElementById("add-btn"),
        clearBtn: () => document.querySelectorAll('.clear'),
        checkList: () => document.getElementById('check-list'),
        editBtns: () => document.querySelectorAll('.edit'),
        saveBtn: () => document.querySelectorAll('.ok'),
        doneTasks: () => document.getElementById('laptops-list')
    }

  addLaptop.model().value = "Asus Rog Zephirus g14"
  addLaptop.storage().value = "2"
  addLaptop.price().value = "2000"

  addLaptop.addBtn().click();
  addLaptop.saveBtn()[0].click();
  addLaptop.clearBtn()[0].click();

  expect($("#add-btn").prop('disabled'), 'Add button was not disabled').to.be.false;

  expect($(document.querySelector("#laptops-list>li")).length).to.equal(0, "Laptop is not removed successfully!")

  addLaptop.addBtn().click();
  addLaptop.saveBtn().click();
  addLaptop.clearBtn().click();

  expect($(document.querySelector("#check-list>li")).length).to.equal(0, "Laptop is not removed successfully!")
  expect($(document.querySelector("#laptops-list>li")).length).to.equal(1, "Laptop is not removed successfully!")

  expect($("#add-btn").prop('disabled'), 'Add button was not disabled').to.be.false;

  expect($(document.querySelector("#laptops-list>li")).length).to.equal(0, "Laptop is not removed successfully!")


  expect($(document.querySelectorAll("li>button")).length).to.equal(1, "The application does not include two buttons!")

  expect($(document.querySelector("#laptops-list>li")).length).to.equal(1, "Laptop is not added successfully!")

  expect($("#add-btn").prop('disabled'), 'Add button was not disabled').to.be.false;

  expect(addLaptop.model().value).to.equal('Asus Rog Zephirus g14', "Input field is not filled!")
  expect(addLaptop.storage().value).to.equal('2', "Input field is not filled!")
  expect(addLaptop.price().value).to.equal('2000', "Input field is not filled!")


  expect($(document.querySelectorAll("li>button")).length).to.equal(2, "The application does not include two buttons!")

  expect($("#add-btn").prop('disabled'), 'Add button was not disabled').to.be.true;

  expect(addLaptop.model().value).to.equal('', "Input field is not cleared!")
  expect(addLaptop.storage().value).to.equal('', "Input field is not cleared!")
  expect(addLaptop.price().value).to.equal('', "Input field is not cleared!")

  expect((document.querySelectorAll("li>article>p"))[0].textContent).to.equal('Asus Rog Zephirus g14', 'Laptop model is invalid.');
  expect((document.querySelectorAll("li>article>p"))[1].textContent).to.equal('Memory: 2 TB', 'Storage content is invalid');
  expect((document.querySelectorAll("li>article>p"))[2].textContent).to.equal('Price: 2000$', 'Price content is invalid.');

  expect($(document.querySelector("#check-list>li")).length).to.equal(1, "Laptop is not added successfully!")