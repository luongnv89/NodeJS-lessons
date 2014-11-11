var http = require('http'),
	filePath = 'bigFile.txt',
	fs = require('fs');
var server = http.createServer(function(req,res){
	var rs = fs.createReadStream(filePath);
	rs.pipe(res,{end:false});
	rs.on(
		'end',
		function(){
			res.write('This is the end! ::::::!!!!! \n');
			res.end();
		}
	);
});

server.listen(8080);
console.log('Server is listening at port: 8080');
