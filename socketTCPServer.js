var server = require('net').createServer(function(socket){
	console.log('New connection');

	socket.setEncoding('utf8');
	socket.write('Hello! You can start typing here.... Type "quit" to exit \n');

	socket.on(
		'data',
		function(data){
			console.log('Got data: ', data.toString());
			if(data.trim().toLowerCase()==='quit'){
				socket.write('Byebye....');
				return socket.end();
			}
			socket.write(data);
		}
	);

	socket.on(
		'end',
		function(){
			console.log('Client connection ended');
		}
	
	);	
}).listen(4001);
