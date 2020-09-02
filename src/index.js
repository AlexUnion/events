/*eslint-disable */
import './index.scss';

const input = document.getElementById('input_item');

const addBtn = document.getElementById('add');
const deleteAllBtn = document.getElementById('delete_all');

const list = document.getElementById('list');

addBtn.addEventListener('click', (element) => {
    const value = input.value;
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.addEventListener('click', _ => li.remove());
    li.insertAdjacentText('beforeend', value);
    li.insertAdjacentElement('beforeend', button);
    button.insertAdjacentText('beforeend', 'Delete');
    list.insertAdjacentElement('beforeend', li);
});

deleteAllBtn.addEventListener('click', _ => {
    list.innerHTML = '';
});
