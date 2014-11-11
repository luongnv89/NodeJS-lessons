function Shape(){
}

Shape.prototype.x = 0;
Shape.prototype.y = 0;

Shape.prototype.move = function(x1,y1) {
	this.x = x1;
	this.y = y1;
};

Shape.prototype.currentPosition = function() {
	console.log('Current position: ('+this.x+'; ' + this.y+')');
};

console.log('TEST SHAPE');
var s = new Shape();
s.currentPosition();
s.move(24,56);
s.currentPosition();

function Square () {
}
Square.prototype= new Shape();
Square.prototype.__proto__ = Shape.prototype;

Square.prototype.width = 0;

Square.prototype.area = function() {
	return this.width*this.width;
};
console.log('TEST SQUARE');
var sq = new Square();
sq.currentPosition();
console.log("Area: " + sq.area());
sq.move(10,13);
sq.width = 10;
sq.currentPosition();
console.log("Area: " + sq.area());

function Reactange () {
}

Reactange.prototype = new Square();
Reactange.prototype.__proto__ = Square.prototype;

Reactange.prototype.height=0;

Reactange.prototype.area = function() {
	return this.height*this.width;
};

console.log('TEST REACTANGE');
var re = new Reactange();
re.currentPosition();
console.log("Area: " + re.area());
re.move(10,13);
re.width = 10;
re.height = 20;
re.currentPosition();
console.log("Area: " + re.area());


console.log('TEST');
console.log(s instanceof Shape);
console.log(sq instanceof Shape);
console.log(re instanceof Shape);

console.log(s instanceof Square);
console.log(sq instanceof Square);
console.log(re instanceof Square);

console.log(s instanceof Reactange);
console.log(sq instanceof Reactange);
console.log(re instanceof Reactange);
