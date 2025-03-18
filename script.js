// Selecting elements
const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const list = document.querySelector('.items');
const clearBtn = document.querySelector('.btn-clear');
const filter = document.querySelector('#filter');
const addItemBtn = document.querySelector('.btn');

let isEdit = false;
let selectedItem = null; // Track the item being edited

// Function to add or update an item
const onAddItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const item = formData.get('item').trim();

    if (item === '') {
        alert('Please enter an item');
        return;
    }
    //I wanna check if item already in list
    let items = JSON.parse(localStorage.getItem('items')) || []

    if (items.includes(item)) {
        alert('Item already in list');
        return;
    }

    if (isEdit) {
        // Update existing item
        updateItemInStorage(selectedItem.textContent, item);
        updateItemInDom(item);
        isEdit = false;
        selectedItem = null;
        addItemBtn.textContent = "+ Add Item";
        addItemBtn.style.backgroundColor = 'black'
    } else {
        addItemToDom(item);
        addItemToStorage(item);
    }

    checkUI();
    form.reset(); // Clears input field
};

// Function to add item to DOM
function addItemToDom(item) {
    const li = document.createElement('li');
    li.className = 'item';
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    li.appendChild(button);
    list.appendChild(li);
}

// Function to update an item in DOM
function updateItemInDom(newItemValue) {
    if (selectedItem) {
        selectedItem.firstChild.textContent = newItemValue;
        selectedItem.style.color='black'
    }
}

// Function to add item to LocalStorage
function addItemToStorage(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

// Function to update item in LocalStorage
function updateItemInStorage(oldItem, newItem) {
    let items = JSON.parse(localStorage.getItem('items')) || [];

    oldItem = oldItem.trim(); // Ensure clean string comparison
    newItem = newItem.trim();

    const index = items.findIndex(i => i.trim() === oldItem); // Find exact match

    if (index !== -1) {
        items[index] = newItem; // Update the item
        localStorage.setItem('items', JSON.stringify(items));
    } else {
        console.warn("Item not found in localStorage:", oldItem);
    }
}

// Function to remove or edit an item (Event Delegation)
const removeOrEditItem = (e) => {
    const removeBtn = e.target.closest('.remove-item');

    if (removeBtn) {
        const li = removeBtn.parentElement;
        const item = li.firstChild.textContent.trim();
        removeItemFromStorage(item);
        if (confirm("Are you sure?")) li.remove();
    } else {
        // Edit mode
        if(e.target.tagName !== 'LI') return;
        if (selectedItem) {
            selectedItem.style.color = 'black';
        }

        // Edit mode - select the new item
        selectedItem = e.target;
        selectedItem.style.color = '#ccc'; // Highlight selected item
        input.value = selectedItem.firstChild.textContent;
        addItemBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
        addItemBtn.style.backgroundColor = 'green';
        input.focus();
        isEdit = true;
    }

    checkUI();
};

// Function to remove item from LocalStorage
function removeItemFromStorage(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(i => i !== item);
    localStorage.setItem('items', JSON.stringify(items));
}

// Function to load items from LocalStorage on page load
function loadItemsFromStorage() {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(item => addItemToDom(item));
}

// Function to remove all items
const removeAllItems = () => {
    list.innerHTML = '';
    localStorage.removeItem('items'); // Only remove items, not all localStorage
    checkUI();
};

// Function to create a button element
function createButton(className) {
    const button = document.createElement('button');
    button.className = className;
    return button;
}

// Function to create an icon element
function createIcon(className) {
    const icon = document.createElement('i');
    icon.className = className;
    return icon;
}

// Function to filter items
function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = list.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        item.style.display = itemName.includes(text) ? 'flex' : 'none';
    });
}
// Function to cancel edit mode
function cancelEditMode() {
    if (selectedItem) {
        selectedItem.classList.remove('selected');
        selectedItem.style.color = 'black';
    }
    selectedItem = null;
    isEdit = false;
    addItemBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    addItemBtn.style.backgroundColor = 'black';
    form.reset();
}

// Function to check UI visibility
function checkUI() {
    if (list.children.length === 0) {
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
}

// Event Listeners
loadItemsFromStorage();
form.addEventListener('submit', onAddItem);
list.addEventListener('click', removeOrEditItem);
clearBtn.addEventListener('click', removeAllItems);
filter.addEventListener('keyup', filterItems);
document.body.addEventListener('click', (e) => {
    // If clicked outside the list and edit mode is active
    if (isEdit && !list.contains(e.target) && e.target !== input) {
        cancelEditMode();
    }
});
checkUI();