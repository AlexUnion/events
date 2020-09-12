function bind(context, func, ...args) {
    return function(...otherArgs) {
        return func.apply(context, [...args, ...otherArgs]);
    }
}

function sum(a, b) {
    this.value = a + b;
    return this.value;
}

const accumulator = {
    value: 0,
}

const addToTwo = bind(accumulator, sum, 2);

console.log(addToTwo(5)); // 7