// Selecting elements
const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const list = document.querySelector('.items');
const clearBtn = document.querySelector('.btn-clear');
const filter = document.querySelector('#filter');

// Function to add an item
const onAddItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const item = formData.get('item').trim();

    if (item === '') {
        alert('Please enter an item');
        return;
    }

    addItemToDom(item)

    addItemToStorage(item)
    checkUI()
    form.reset(); // Clears input field
};
function addItemToDom(item){
    const li = document.createElement('li');
    li.className = 'item';
    li.appendChild(document.createTextNode(item)); // Append text properly

    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    li.appendChild(button);
    list.appendChild(li);
}
function addItemToStorage(item){
    let items;
    if(localStorage.getItem('items') === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}
// Function to remove a single item (Event Delegation)
const removeItem = (e) => {
    const removeBtn = e.target.closest('.remove-item');
    const li = removeBtn.parentElement;
    const item = li.textContent;
    removeItemFromStorage(item)
    if (removeBtn) {
        if(confirm("Are you sure?")) removeBtn.parentElement.remove();
    }
    checkUI()
};

function removeItemFromStorage(item) {
    let items = JSON.parse(localStorage.getItem('items')) || []; // Default to empty array
    items = items.filter(i => i !== item);
    localStorage.setItem('items', JSON.stringify(items));
}
function loadItemsFromStorage(){
    let items = JSON.parse(localStorage.getItem('items'));
    if(items === null) items = [];
    items.forEach(item => addItemToDom(item));
}


// Function to remove all items
const removeAllItems = () => {
    list.innerHTML = '';
    localStorage.clear()
    checkUI()
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
function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = list.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkUI() {
    if(list.children.length === 0) {
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
list.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeAllItems);
filter.addEventListener('keyup', filterItems);
checkUI();
