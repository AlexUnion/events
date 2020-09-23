/*eslint-disable */
import './index.css';

import TodoElement from "./modules/todoElement";

const input = document.getElementById('input_item');
const addBtn = document.getElementById('add');
const deleteAllBtn = document.getElementById('delete_all');
const list = document.getElementById('list');
const form = document.getElementById('form');

class TodoList {

    todos = [];

    constructor(form, input, list, addBtn, deleteBtn) {

        this.list = list;

        addBtn.addEventListener('click', (event) => this.onSubmit(event));
        deleteBtn.addEventListener('click', _ => this.onDeleteAll());

        this.renderList();
    }

    onSubmit(event) {
        event.preventDefault();

        const text = input.value;
        if (!text || !text.trim()) return;

        input.value = '';
        this.addElement(text);

        this.renderList(list);
    }

    onDeleteAll() {
        this.remove();
        list.innerHTML = '';
    }

    renderList() {
        this.list.innerHTML = '';

        this.todos.map((item) => {
            const element = this.create(item);

            this.list.insertAdjacentElement('beforeend', element);
        });

    }

    addElement(text) {
        const todoElement = new TodoElement(text);
        this.todos.push(todoElement);
    }

    create(todoElement) {
        //Create to_do text block
        const todoText = document.createElement('div');
        todoText.className += 'item_text inner_item';

        todoText.innerText = todoElement.getText();

        //Create container for buttons
        const btnContainer = document.createElement('div');
        btnContainer.className += 'item_btn inner_item';

        //Main list element (li)
        const listItem = document.createElement('li');
        listItem.className += 'item';

        //Insert to main container
        listItem.insertAdjacentElement('beforeend', todoText);
        listItem.insertAdjacentElement('beforeend', btnContainer);

        //Create buttons
        const btnEdit = document.createElement('button');
        btnEdit.className += 'btn purple';
        btnEdit.insertAdjacentText('beforeend', 'Edit');

        const btnDelete = document.createElement('button');
        btnDelete.className += 'btn red';
        btnDelete.insertAdjacentText('beforeend', 'Delete');

        //Insert buttons to btnContainer
        btnContainer.insertAdjacentElement('beforeend', btnEdit);
        btnContainer.insertAdjacentElement('beforeend', btnDelete);

        btnEdit.addEventListener('click', _ => {
            todoText.tabIndex = -1;
            todoText.setAttribute('contenteditable', true);
            todoText.focus();

        });

        todoText.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                todoText.blur();
            }
        });

        todoText.onblur = () => {
            todoText.setAttribute('contenteditable', false);
            todoText.removeAttribute('tabIndex');
            todoElement.setText(todoText.innerText);
            this.renderList();
        }

        btnDelete.addEventListener('click',_ => {
            this.deleteById(todoElement.getId());
            this.renderList();
        });

        todoText.addEventListener('click',_ => {
            const isDone = todoElement.isDone();
            if (isDone) {
                todoText.style = "background-color: '#9a9a9a'";
            } else {
                todoText.style = 'background-color: #2a2';
            }
            todoElement.setDone(!isDone);
        });

        return listItem;
    }

    remove() {
        this.todos.length = 0;
    }

    deleteById(id) {
        this.todos = this.todos.filter((el) => el.getId() !== id);
    }
}

const todoList = new TodoList(form, input, list, addBtn, deleteAllBtn);
