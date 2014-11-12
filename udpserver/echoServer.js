var dgram = require('dgram');
var server = dgram.createSocket('udp4'),
    port= 4000;

server.on(
	'message',
	function(message,rinfo){
		console.log('Got message: ' + message.toString()+" from: " + rinfo.address+":"+rinfo.port);
		server.send(message,0,message.length,rinfo.port,rinfo.address);
	}
);

server.bind(port);
