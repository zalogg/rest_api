const apiUrl = '/api/items';

async function fetchItems() {
    const response = await fetch(apiUrl);
    const items = await response.json();
    const itemsList = document.getElementById('items-list');
    const itemSelect = document.getElementById('item-select');

    itemsList.innerHTML = '';
    itemSelect.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        itemsList.appendChild(li);

        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        itemSelect.appendChild(option);
    });
}

async function addItem() {
    const itemInput = document.getElementById('item-input');
    const itemName = itemInput.value;
    if (itemName) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: Date.now().toString(), name: itemName })
        });
        if (response.ok) {
            itemInput.value = '';
            fetchItems();
        }
    }
}

async function updateItem() {
    const itemSelect = document.getElementById('item-select');
    const itemId = itemSelect.value;
    const newName = prompt('Ingrese el nuevo nombre del ítem:');
    if (itemId && newName) {
        const response = await fetch(`${apiUrl}/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        });
        if (response.ok) {
            fetchItems();
        }
    }
}

async function deleteItem() {
    const itemSelect = document.getElementById('item-select');
    const itemId = itemSelect.value;
    if (itemId) {
        const response = await fetch(`${apiUrl}/${itemId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchItems();
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchItems);
