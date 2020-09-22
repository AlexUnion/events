/*eslint-disable */
import './index.css';

import TodoElement from "./modules/todoElement";
import Div from "./modules/div";
import LiElement from "./modules/item";
import Button from "./modules/button";

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
        if (!text || !text.replaceAll(' ', '')) return;

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

        const listElements = this.todos.map((el) => {
            return this.create(el);
        });

        listElements.forEach((el) => {
            this.list.insertAdjacentElement('beforeend', el);
        });

    }

    addElement(text) {
        const todoElement = new TodoElement(text);
        this.todos.push(todoElement);
    }

    create(todoElement) {
        //Create to_do text block
        const todoText = new Div('item_text inner_item');
        todoText.setInnerText(todoElement.getText());

        //Create container for buttons
        const btnContainer = new Div('item_btn inner_item');

        //Main list element (li)
        const listItem = new LiElement('item');

        //Insert to main container
        listItem.insertElements(todoText.getDiv(), btnContainer.getDiv());

        //Create buttons
        const btnEdit = new Button('btn purple', 'Edit');
        const btnDelete = new Button('btn red', 'Delete');

        //Insert buttons to btnContainer
        btnContainer.insertElements(btnEdit.getButton(), btnDelete.getButton());

        btnEdit.addClickListener(_ => {
            todoText.getDiv().tabIndex = -1;
            todoText.getDiv().setAttribute('contenteditable', true);
            todoText.getDiv().focus();
            /*
            if (text && text.replaceAll(' ', '')) {
                todoText.setInnerText(text);
            }*/
        });

        todoText.getDiv().addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                todoText.getDiv().blur();
            }
        });

        todoText.getDiv().onblur = () => {
            todoText.getDiv().setAttribute('contenteditable', false);
            todoText.getDiv().removeAttribute('tabIndex');
            todoElement.setText(todoText.getDiv().innerText);
            this.renderList();
        }

        btnDelete.addClickListener(_ => {
            this.deleteById(todoElement.getId());
            this.renderList();
        });

        todoText.addClickListener(_ => {
            const isDone = todoElement.isDone();
            if (isDone) {
                todoText.element.style = "background-color: '#9a9a9a'";
            } else {
                todoText.element.style = 'background-color: #2a2';
            }
            todoElement.setDone(!isDone);
        })

        return listItem.element;
    }

    remove() {
        this.todos.length = 0;
    }

    deleteById(id) {
        this.todos = this.todos.filter((el) => el.getId() !== id);
    }
}

const todoList = new TodoList(form, input, list, addBtn, deleteAllBtn);
