const person = new Object({
    name: 'Maxim',
    age: 25,
    greet: function () {
        console.log('greet');
    }
});

Object.prototype.sayHello = function () {
    console.log('Hello DDD')
};

const lena = Object.create(person);

const str = new String('I am str');