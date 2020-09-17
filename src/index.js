/*eslint-disable */
import './index.css';

import ListItem from './modules/item';
import Button from './modules/button';
import Div from './modules/div';

const input = document.getElementById('input_item');

const addBtn = document.getElementById('add');
const deleteAllBtn = document.getElementById('delete_all');

const list = document.getElementById('list');

const todoItems = [];

addBtn.addEventListener('click', (element) => {
    const value = input.value;

    if (!value || !value.replaceAll(' ', '')) return;

    const todoText = new Div('item_text inner_item');
    todoText.setInnerText(value);

    const listItem = new ListItem('item');
    const divElements = new Div('item_btn inner_item');

    listItem.insertElements(todoText.getDiv(), divElements.getDiv());

    const btnEdit = new Button('btn purple', 'Edit');
    const btnDelete = new Button('btn red', 'Delete');

    divElements.insertElements(btnEdit.getButton(), btnDelete.getButton());

    btnEdit.addClickListener(_ => {
        const text = prompt('Edit "To do" item.');
        if (text && text.replaceAll(' ', '')) {
            todoText.setInnerText(text);
        }
    });

    btnDelete.addClickListener(_ => listItem.remove());

    todoText.addClickListener(_ => {
        if (todoText.getCheck()) {
            todoText.element.style = "background-color: '#9a9a9a'";
        } else {
            todoText.element.style = 'background-color: green';
        }
        todoText.setCheck();
    })

    list.insertAdjacentElement('beforeend', listItem.element);
});

deleteAllBtn.addEventListener('click', _ => {
    list.innerHTML = '';
});
