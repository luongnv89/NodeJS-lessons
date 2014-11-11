var sockets = [],
	port = 4001,
 	server = require('net').createServer();

server.on(
	'listening',
	function(){
		console.log("Server is listening at port: " + port);
	}
);

server.on(
	'connection',
	function(socket){
		sockets.push(socket);
		socket.on(
			'data',
			function(data){
				sockets.forEach(function(otherSocket){
					if(otherSocket!=socket){otherSocket.write(data)};
				});
			}
		);

		socket.on(
			'end',
			function(){
				var index = sockets.indexOf(socket);
				sockets.splice(index,1);
			}
		);

	}
);


server.on(
	'error',
	function(err){
		console.log('Something wrong!!!!');
		server.close();
	}
);

server.on(
	'close',
	function(){
		console.log("Server is closed!");
	}
);

server.listen(port);
