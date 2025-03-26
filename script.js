document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('budgetForm');
    const itemInput = document.getElementById('item');
    const amountInput = document.getElementById('amount');
    const tableBody = document.getElementById('budgetTable');

    // Load existing items from local storage
    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('budgetItems')) || [];
        tableBody.innerHTML = '';
        items.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.amount}</td>
                <td>
                    <button class="edit" onclick="editItem(${index})">Edit</button>
                    <button class="delete" onclick="deleteItem(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    // Save items to local storage
    const saveItems = (items) => {
        localStorage.setItem('budgetItems', JSON.stringify(items));
    };

    // Add item
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = itemInput.value;
        const amount = amountInput.value;

        if (name && amount) {
            const items = JSON.parse(localStorage.getItem('budgetItems')) || [];
            items.push({ name, amount });
            saveItems(items);
            loadItems();
            itemInput.value = '';
            amountInput.value = '';
        }
    });

    // Edit item
    window.editItem = (index) => {
        const items = JSON.parse(localStorage.getItem('budgetItems'));
        const item = items[index];
        itemInput.value = item.name;
        amountInput.value = item.amount;

        // Remove item and allow editing
        deleteItem(index);
    };

    // Delete item
    window.deleteItem = (index) => {
        const items = JSON.parse(localStorage.getItem('budgetItems'));
        items.splice(index, 1);
        saveItems(items);
        loadItems();
    };

    // Initial load
    loadItems();
});
