import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://todo-app-94574-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

onValue(shoppingListInDB, function (snapshot) {
  clearShoppingList();

  if(snapshot.exists()) {

    const itemsArray = Object.entries(snapshot.val());
  
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
  
      appendListElement(currentItem);
    }
  }
  else {
    shoppingListEl.innerHTML = "No items here.... yet"
  }
});

function appendListElement(item) {
  let itemID = item[0];
  let itemValue = item[1];

  
  const newEl = document.createElement('li');
  newEl.textContent = itemValue;
  shoppingListEl.append(newEl)

  newEl.addEventListener('click', () => {
    let exactLocationDB = ref(database, `shoppingList/${itemID}`)
    remove(exactLocationDB)
  })
};

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);
  clearInputFieldAndFocus();
});

function clearShoppingList() {
  shoppingListEl.innerHTML = "";
};

function clearInputFieldAndFocus() {
  inputFieldEl.value = "";
  inputFieldEl.focus();
};