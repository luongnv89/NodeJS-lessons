var server = require('net').createServer(),
	port = 4001;

server.on(
	'listening',
	function(){
		console.log('Server is listeing on port: ' + port);
	}
);

server.on(
	'connection',
	function(socket){
		console.log("New connection ... ");
		socket.end();
		server.close();
	}

);

server.on(
	'close',
	function(){
		console.log('Server is now closed');
	}

);


server.on(
	'error',
	function(err){
		console.error(err);
	}
);

server.listen(port);
