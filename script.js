// elements.
const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const addBtn = document.querySelector('.btn');
const list = document.querySelector('.items');

//functions
const addItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const item = formData.get('item');
    if (item === '') {
        alert('Please enter an item');
        return;
    }
    const value = item;
    const li = document.createElement('li');
    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    li.textContent = value;
    button.appendChild(icon)
    li.appendChild(button);
    list.appendChild(li);
    input.value = '';
}

function createButton(className) {
    const button = document.createElement('button');
    button.className = className;
    return button;
}
function createIcon(className) {
    const icon = document.createElement('i');
    icon.className = className;
    return icon;
}


//event listeners
    form.addEventListener('submit', addItem);


