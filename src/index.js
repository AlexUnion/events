/*eslint-disable */
import './index.css';

import TodoElement from "./modules/todoElement";

const STORAGE_KEY = 'todo_list';

const input = document.getElementById('input_item');
const deleteAllBtn = document.getElementById('delete_all');
const list = document.getElementById('list');
const form = document.getElementById('form');

const btnAll = document.getElementById('filter_all');
const btnCompleted = document.getElementById('filter_completed');
const btnUncompleted = document.getElementById('filter_uncompleted');
const btnDeleteDone = document.getElementById('delete_done');

class TodoList {

    todos = [];

    constructor(form, input, list, deleteBtn, btnAll,
                btnCompleted, btnUncompleted, btnDeleteDone) {

        this.list = list;

        this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        this.todos.forEach((item) => {
            Object.setPrototypeOf(item, TodoElement.prototype);
        })

        form.addEventListener('submit', (event) => this.onSubmit(event));
        deleteBtn.addEventListener('click', _ => this.onDeleteAll());

        btnAll.addEventListener('click', _ => this.renderList());
        btnCompleted.addEventListener('click', _ => this.renderFilteredList('complete'));
        btnUncompleted.addEventListener('click', _ => this.renderFilteredList('uncomplete'));

        btnDeleteDone.addEventListener('click', _ => this.deleteDone());

        this.renderList();
    }

    onSubmit(event) {
        event.preventDefault();

        const text = input.value;
        if (!text || !text.trim()) return;

        input.value = '';
        this.addElement(text);

        this.renderList();
    }

    onDeleteAll() {
        this.remove();
        list.innerHTML = '';
        localStorage.clear();
    }

    deleteDone() {
        list.innerHTML = '';
        this.todos = this.todos.filter((el) => !el.isDone());
        this.renderList();
    }

    renderList(todos = this.todos) {

        this.list.innerHTML = '';

        todos.map((item) => {
            const element = this.create(item);

            this.list.insertAdjacentElement('beforeend', element);
        });

    }

    renderFilteredList(filter) {
        let filteredList = null;
        if (filter === 'complete') {
            filteredList = this.todos.filter(item => item.isDone());
        } else if (filter === 'uncomplete') {
            filteredList = this.todos.filter(item => !item.isDone());
        }
        this.renderList(filteredList);
    }

    addElement(text) {
        const todoElement = new TodoElement(text);
        this.todos.push(todoElement);
        console.log(this.todos);
        console.log(JSON.stringify(this.todos));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    }

    create(todoElement) {
        //Create to_do text block
        const todoText = document.createElement('div');
        todoText.classList.add('item_text', 'inner_item');
        todoElement.isDone() && todoText.classList.add('active');

        todoText.innerText = todoElement.getText();

        //Create container for buttons
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('item_btn', 'inner_item');

        //Main list element (li)
        const listItem = document.createElement('li');
        listItem.classList.add('item');

        //Insert to main container
        listItem.insertAdjacentElement('beforeend', todoText);
        listItem.insertAdjacentElement('beforeend', btnContainer);

        //Create buttons
        const btnEdit = document.createElement('button');
        btnEdit.classList.add('btn', 'purple');
        btnEdit.insertAdjacentText('beforeend', 'Edit');

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'red');
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
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
        }

        btnDelete.addEventListener('click',_ => {
            this.deleteById(todoElement.getId());
            this.renderList();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
        });

        todoText.addEventListener('click',_ => {
            const isDone = todoElement.isDone();

            todoText.classList.toggle('active');

            todoElement.setDone(!isDone);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
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

const todoList = new TodoList(form, input, list, deleteAllBtn,
    btnAll, btnCompleted, btnUncompleted, btnDeleteDone);
