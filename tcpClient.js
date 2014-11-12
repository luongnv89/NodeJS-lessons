var net = require('net'),
	port = 4000,
	quitting = false,
	conn,
	retryTimeOut = 3000,
	retriedTimes = 0,
	maxRetries = 10;

process.stdin.resume();
process.stdin.on(
	'data',
	function(data){
		if(data.toString().trim().toLowerCase()==='quit'){
			quitting = true;
			console.log('Quitting ... ');
			conn.end();
			process.stdin.pause();
		}else { 
			con.write(data);
		}
	}
);

(function connect(){
	function reconnect(){
		if(retriedTimes>=maxRetries){
			throw new Error('Max retrie have been exceed, I give up');
		}
		retriedTimes +=1;
		setTimeout(connect,retryTimeOut);
	}

	conn = net.createConnection(port);
	conn.on(
		'connect',
		function(){
			retriedTimes = 0;
			console.log('Connected to server');
		}
	);	

	conn.on(
		'error',
		function(err){
			console.log('Error in connection: ',err);
		}
	);

	conn.on(
		'close',
		function(){
			if(!quitting){
				console.log('connection got closed, will try to connect');
				reconnect();
			}
		}
	);

	conn.pipe(process.stdout,{end:false});
})();
