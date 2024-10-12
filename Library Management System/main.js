let user = prompt("Hello reader! What's your name?", "Guest");
alert(`Happy reading, ${user}!`);

setInterval(utime, 1000);

function utime() {
    time.innerHTML = new Date();
}

let tableBody = document.getElementById('tbody');
let data = [];

function loadData() {
    if (localStorage.getItem('tableData')) {
        data = JSON.parse(localStorage.getItem('tableData'));
    }
    displayData();
}

// Function to display data in the table
function displayData() {
    tableBody.innerHTML = '';
    data.forEach((row, index) => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
<td>${index + 1}</td> 
<td><input type="text" value="${row.name}"></td> 
<td><input type="text" value="${row.author}"></td>
<td><input type="text" value="${row.price}"></td>
<td><input type="text" value="${row.discount}"></td>
<td>
<button onclick="editRow(${index})">Edit</button>
<button onclick="deleteRow(${index})">Delete</button>
</td>`;
        tableBody.appendChild(tableRow);
    });
}

// Function to add a new row
function addRow() {
    // var name = prompt('Enter name of the Book');
    let name = prompt('Enter name of the Book');
    let author = prompt('Enter name of the Author');
    let price = prompt('Enter Price');
    let discount = prompt('Enter Discount');

    if (name && author && price && discount) {
        data.push({ name, author, price, discount });
        localStorage.setItem('tableData', JSON.stringify(data)); 
        displayData();
    } else {
        alert('Please enter all the details correctly.');
    }
}

// Function to edit a row
function editRow(index) {
    let row = data[index];
    let newName = prompt('Enter new name of the Book', row.name);
    let newAuthor = prompt('Enter new name of the Author', row.author);
    let newPrice = prompt('Enter new Price', row.price);
    let newDiscount = prompt('Enter new Discount', row.discount);

    if (newName || newAuthor || newPrice || newDiscount) {
        if (newName) {
            row.name = newName;
        }
        if (newAuthor) {
            row.author = newAuthor;
        }
        if (newPrice) {
            row.price = newPrice;
        }
        if (newDiscount) {
            row.discount = newDiscount;
        }
        localStorage.setItem('tableData', JSON.stringify(data)); // Update local storage (if available)
        displayData();
    } else {
        alert('No changes made.');
    }
}

// Function to delete a row
function deleteRow(index) {
    data.splice(index, 1);  //(position, no. of items)
    localStorage.setItem('tableData', JSON.stringify(data)); // Update local storage (if available)
    displayData();
}

loadData(); // Loads data

// Function to get final payable price after calculating the discount
function results() {
    let originalPrice = parseFloat(document.getElementById("price").value);
    let disc = parseFloat(document.getElementById("discount").value);

    // Check for valid input
    if (isNaN(originalPrice) || isNaN(disc)) {
        alert("Please enter valid numbers for price and discount.");
        return;
    }

    let discountAmount = originalPrice * (disc / 100);
    let finalPrice = originalPrice - discountAmount;

    let final = document.getElementById("result");
    final.textContent = `${finalPrice.toFixed(2)}`;
}
