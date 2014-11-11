var util = require('util'),
EventEmitter = require('events').EventEmitter;

var Ticker = function(){
	var self = this;
	setInterval(function(){
		self.emit('tick');
	},1000);
	setInterval(function(){self.emit('data','new data is comming');},5000);
};

util.inherits(Ticker,EventEmitter);

var t1 = new Ticker();
t1.on('tick',function(){
	console.log('Tick...');
});

t1.on('data',function(data){
	console.log(data);
});

