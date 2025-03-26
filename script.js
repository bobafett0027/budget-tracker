// Wait for the HTML document to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    
    // Select important elements from the document
    const form = document.getElementById('budgetForm'); // The form where user enters budget items
    const itemInput = document.getElementById('item'); // Input field for item name
    const amountInput = document.getElementById('amount'); // Input field for amount
    const tableBody = document.getElementById('budgetTable'); // The table body where items will be displayed
    const totalElement = document.getElementById('total'); // The element that displays the total amount

    // Function to load items from local storage and display them in the table
    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('budgetItems')) || []; // Get stored items or set empty array if none exist
        tableBody.innerHTML = ''; // Clear the table before adding new items
        
        // Loop through each item and create a table row
        items.forEach((item, index) => {
            const row = document.createElement('tr'); // Create a new table row
            row.innerHTML = `
                <td>${item.name}</td> 
                <td>${parseFloat(item.amount).toFixed(2)}</td> 
                <td>
                    <button class="edit" onclick="editItem(${index})">Edit</button>
                    <button class="delete" onclick="deleteItem(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row); // Add the row to the table
        });

        updateTotal(); // Update the total amount whenever items are loaded
    };

    // Function to save items to local storage
    const saveItems = (items) => {
        localStorage.setItem('budgetItems', JSON.stringify(items)); // Convert items array to string and store in localStorage
    };

    // Function to add a new item when form is submitted
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission (avoids page refresh)
        
        const name = itemInput.value.trim(); // Get the item name and remove unnecessary spaces
        const amount = parseFloat(amountInput.value.trim()); // Convert amount to a number
        
        // Ensure the user entered valid values
        if (name && !isNaN(amount)) {
            const items = JSON.parse(localStorage.getItem('budgetItems')) || []; // Get existing items or create a new array
            items.push({ name, amount }); // Add new item to the array
            saveItems(items); // Save updated list to local storage
            loadItems(); // Reload the table with updated data
            itemInput.value = ''; // Clear input fields after submission
            amountInput.value = '';
        }
    });

    // Function to update the total sum of all items in the table
    function updateTotal() {
        const items = JSON.parse(localStorage.getItem('budgetItems')) || []; // Get stored items or empty array
        let total = items.reduce((sum, item) => sum + parseFloat(item.amount), 0); // Calculate sum of all amounts
        totalElement.textContent = total.toFixed(2); // Display total with 2 decimal places
    }

    // Function to edit an item in the table
    window.editItem = (index) => {
        const items = JSON.parse(localStorage.getItem('budgetItems')); // Retrieve stored items
        const item = items[index]; // Get the item at the given index
        itemInput.value = item.name; // Populate input fields with existing data
        amountInput.value = item.amount;

        deleteItem(index); // Remove the existing entry so it can be re-added after editing
    };

    // Function to delete an item from the table and update storage
    window.deleteItem = (index) => {
        const items = JSON.parse(localStorage.getItem('budgetItems')); // Retrieve stored items
        items.splice(index, 1); // Remove the selected item from the array
        saveItems(items); // Save the updated list to local storage
        loadItems(); // Reload the table with updated data
    };

    // Initial load of items when the page is opened
    loadItems();
});
