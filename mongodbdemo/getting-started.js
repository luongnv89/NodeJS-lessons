var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test2');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function () {
	console.log('Connected successfully!');
	var kittySchema = mongoose.Schema({
		name:String
	});

	kittySchema.methods.speak = function () {
		var greeting = this.name?"Meow name is " + this.name:"I don't have a name";
		console.log(greeting);
	};

	var Kitten = mongoose.model('Kitten',kittySchema);

	var silence = new Kitten({name:'Silence'});
	console.log("New kitten: "+silence.name);

	var fluffy = new Kitten({name:'Fluffy'});
	console.log("New kitten: "+fluffy.name);
	fluffy.speak();

	fluffy.save(function (err,fluffy) {
		if(err) return console.error(err);
		console.log("Save a kitten into database");
		fluffy.speak();
	});

	Kitten.find(function (err,kittens) {
		if(err) return console.error(err);
		console.log("find all kittens: "+kittens);
	});

	Kitten.find({name:'/^Fluff/'},function (err,kit) {
		if(err) return console.error(err);
		console.log("find all kittens with the name of Fluff: "+kit);
	});

	db.close();
});

