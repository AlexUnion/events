function defer(f, ms) {
    return function() {
        setTimeout(() => {
            f.apply(this, arguments);
            console.log(this);
            console.log(arguments);
        }, ms);
    }
}

function sayHi(who) {
    console.log('hello, ' + who);
}

let sayHiDefer = defer(sayHi, 2000);
sayHiDefer('John');
