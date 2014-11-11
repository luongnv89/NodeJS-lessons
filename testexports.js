var 
greeter = require('./greater.js'),
	greeter2 = require('./greeter.js');

var g = greeter.createGreeter('fr');
console.log(g.greet());

var g2 = new greeter2('vi');
console.log(g2.greet());
