// Selecting elements
const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const list = document.querySelector('.items');
const clearBtn = document.querySelector('.btn-clear');

// Function to add an item
const addItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const item = formData.get('item').trim();

    if (item === '') {
        alert('Please enter an item');
        return;
    }

    const li = document.createElement('li');
    li.className = 'item';
    li.appendChild(document.createTextNode(item)); // Append text properly

    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    li.appendChild(button);

    list.appendChild(li);

    form.reset(); // Clears input field
};

// Function to remove a single item (Event Delegation)
const removeItem = (e) => {
    const removeBtn = e.target.closest('.remove-item'); // More reliable check
    if (removeBtn) {
        removeBtn.parentElement.remove();
    }
};

// Function to remove all items
const removeAllItems = () => {
    list.innerHTML = '';
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

// Event Listeners
form.addEventListener('submit', addItem);
list.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeAllItems);