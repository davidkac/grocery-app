var editedItem = "";

// Method for initializing list
function getListFromLocalStorage() {
  let listString = localStorage.getItem("listOfGroceries");
  if (listString) {
    return JSON.parse(listString);
  } else {
    return [];
  }
}

// Method for saving list to localStorage
function saveToLocalStorage(list) {
  localStorage.setItem("listOfGroceries", JSON.stringify(list));
}

// Method for loading all items to the view
function loadItems(list) {
  list.forEach((element) => {
    addItem(element);
    return;
  });
}

// Method for deleting list item
function deleteItem(name) {
  var listOfGroceries = getListFromLocalStorage();
  listOfGroceries = listOfGroceries.filter(function (item) {
    if (item.name != name) return item;
  });
  $("#myList").html("");
  loadItems(listOfGroceries);
  saveToLocalStorage(listOfGroceries);
}

// Method for deleting all items
function deleteAll() {
  $("#myList").html("");
  saveToLocalStorage([]);
}

// Method for caching edited item
function cacheEditedItem(name) {
  editedItem = name;
}

// Save name of edited item
function saveNameOfEditItem(newName) {
  var listOfGroceries = getListFromLocalStorage();
  listOfGroceries = listOfGroceries.map(function (item) {
    if (item.name == editedItem) item.name = newName;
    return item;
  });
  saveToLocalStorage(listOfGroceries);
}

// Method for appending list item to the view
function addItem(item) {
  $("#myList").append(
    `
        <div class="card mb-3 mb-lg-0 list-item">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <div>
                  <img
                    src="./img/list-item.png"
                    class="img-fluid rounded-3"
                    alt="Shopping item"
                    style="width: 65px"
                  />
                </div>
                <div class="ms-3">
                  <h5 contenteditable="true">` +
      item.name +
      `</h5>
                </div>
              </div>
              <div class="d-flex flex-row align-items-center">
                <div style="width: 100px">
                  <h5 class="fw-normal mb-0">` +
      item.quantity +
      ` kom</h5>
                </div>
                <div style="width: 80px">
                  <h5 class="mb-0">` +
      item.price +
      ` din</h5>
                </div>
                <a href="#!" style="color: #cecece" class="delete-btn" onClick="deleteItem('` +
      item.name +
      `');">
                <i class="fa-solid fa-trash"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `
  );
  return;
}

$(document).ready(function () {
  // Initiate list of Items on document load
  var listOfGroceries = getListFromLocalStorage();
  loadItems(listOfGroceries);

  // Edit name of list items on click
  $('h5[contenteditable="true"]').on("click", function () {
    $(this).addClass("editing");
    cacheEditedItem($(this).html());
  });

  $('h5[contenteditable="true"]').on("blur", function () {
    $(this).removeClass("editing");
    saveNameOfEditItem($(this).html());
  });

  // Handle form submission
  $("#groceryForm").submit(function (event) {
    event.preventDefault(); // prevent default form submission

    // Get item values
    var item = {
      name: $("#name").val(),
      quantity: $("#quantity").val(),
      price: $("#price").val(),
    };

    // Add item to the view
    addItem(item);

    // Get updated list from localStorage, add new item, and save it
    var listOfGroceries = getListFromLocalStorage();
    listOfGroceries.push(item);
    saveToLocalStorage(listOfGroceries);
  });
});
