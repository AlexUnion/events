/*eslint-disable */

class Robot {
    constructor(name = 'Android Valera', weight = 1, coords = {x: 0, y: 0},
                chipVersion = 1) {
        this.name = name;
        this.weight = weight;
        this.coords = coords;
        this.chipVersion = chipVersion;
    }

    goForward(step) {
        this.coords.y += step || 1;
    }
    goBack(step) {
        this.coords.y -= step || 1;
    }
    goRight(step) {
        this.coords.x -= step || 1;
    }
    goLeft(step) {
        this.coords.x += step || 1;
    }
    getInfo() {
        return `Robot: ${this.name} \nChip version: ${this.chipVersion} \nWeight: ${this.weight}`;
    }
}

class FlyingRobot extends Robot {
    constructor(name, weight, coords = {x: 0, y: 0, z: 0}, chipVersion) {
        super(name, weight, null, chipVersion);
        this.coords = coords;
    }

    goUp(step) {
        this.coords.z += step || 1;
    }
    goDown(step) {
        this.coords.z -= step || 1;
    }
}
