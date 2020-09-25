/*eslint-disable */

import uniqId from 'uniqid';

class TodoElement {

    item = {
        isDone: false,
        text: '',
        id: uniqId(),
    }

    constructor(text) {
        if (text) {
            this.item.text = text;
        }
    }

    isDone() {
        return this.item.isDone;
    }

    setDone(isDone) {
        this.item.isDone = isDone;
    }

    setText(text) {
        this.item.text = text;
    }

    getText() {
        return this.item.text;
    }

    getId() {
        return this.item.id;
    }
}

export default TodoElement;