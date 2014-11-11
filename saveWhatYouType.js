var ws = require('fs').createWriteStream('saveWhatYouType.txt');

require('net').createServer(function(socket){
	socket.pipe(ws,{end:false});

	socket.setTimeout(3000);

	socket.on(
		'timeout',
		function(){
			socket.write('Timeout!!! Bye!');
			socket.end();
		}
	);
	socket.on(
		'end',
		function(){
			console.log("Socket is now closed!");
		}
	);
}).listen(4001);
