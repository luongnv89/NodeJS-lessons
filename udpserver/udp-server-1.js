var dgram = require('dgram'),
	port = 4000;

var server = dgram.createSocket('udp4');

server.on(
	'message',
	function(message){
		console.log('Got message: ' + message);	
	}
);

server.on(
	'listening',
	function(){
		var address = server.address();
		console.log('Server listening on '+ address.address+':' + address.port);
	}
);

server.bind(port);
