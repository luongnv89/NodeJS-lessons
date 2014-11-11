var http = require('http'),
	filePath = 'bigFile.txt',
	fs = require('fs');
var server = http.createServer(function(req,res){
	var rs = fs.createReadStream(filePath);
	rs.on(
		'data',
		function(data){
			if(!res.write(data)){
				rs.pause();
			}
		}
	);

	res.on(
		'drain',
		function(){
			rs.resume();
		}
	);

	rs.on(
		'end',
		function(){
			res.end();
		}
	);
});

server.listen(8080);
console.log('Server is listening at port: 8080');
