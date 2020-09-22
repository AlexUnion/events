/*eslint-disable */

class Li {
    constructor(classList) {
        this.element = document.createElement('li');
        this.element.className += classList;
    }

    insertElements(...elements) {
        elements.map(elem => {
            this.element.insertAdjacentElement('beforeend', elem);
        })
    }

    remove() {
        this.element.remove();
    }
}

export default Li;