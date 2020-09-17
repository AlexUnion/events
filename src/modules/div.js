/*eslint-disable */

class Div {
    constructor(classList) {
        this.element = document.createElement('div');
        this.element.className += classList;
        this.isChecked = false;
    }

    getDiv() {
        return this.element;
    }

    setInnerText(value) {
        this.element.innerText = value;
    }

    insertElements(...elements) {
        elements.map(element => {
            this.element.insertAdjacentElement('beforeend', element);
        })
    }

    addClickListener(func) {
        this.element.addEventListener('click', func);
    }

    setCheck() {
        this.isChecked = !this.isChecked;
    }

    getCheck() {
        return this.isChecked;
    }
}

export default Div;