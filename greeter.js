function Greeter (lang) {
	this.language = lang;
	this.greet = function(){
		if(this.language=='en') return "Hello World";
		else if(this.language=='fr') return "Bonjour tout le monde";
		else return "We don't speak " + this.language;
	}
}

module.exports = Greeter;