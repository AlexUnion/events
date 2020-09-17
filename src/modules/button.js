/*eslint-disable */

class Button {
    constructor(classList, value) {
        this.element = document.createElement('button');
        this.element.className += classList;
        this.element.insertAdjacentText('beforeend', value);
    }

    getButton() {
        return this.element;
    }

    addClickListener(func) {
        this.element.addEventListener('click', func);
    }
}

export default Button;