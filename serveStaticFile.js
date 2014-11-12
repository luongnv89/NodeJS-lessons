var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	port = 80;

var server = http.createServer(function (req,res){
	console.log("Request to serve file: " + req.url);
	var filePath = (req.url).split("?")[0];
	var file = path.normalize('.'+filePath);
	var ext = path.extname(file);
        if(ext==""){
                file += '/index.html';
                ext = path.extname(file);
        }

	console.log('Trying to serve file: ' + file);

	function reportError(err){
		console.log(err);
		res.writeHead(500);
		res.end('Internal Server Error: ' + err.message);
	}

	path.exists(file,function(exists){
		if(exists){
			fs.stat(file,function(err,stat){
				if(err) return reportError(err);
				if(stat.isDirectory()){
					res.writeHead(403);
					res.end('Forbidden!');									
				}else{
					var rs = fs.createReadStream(file);
					rs.on(
						'error',
						reportError
					);
					
					getContentType(ext,function(err,extfile){
						if(err) return reportError(err);
						res.writeHead(200,{"Content-type":extfile});
						rs.pipe(res);
					});
				}	
			});
		}
		else{
			res.writeHead('404');
			res.end('File not found!');
		}
	});
});

server.listen(port);

console.log('Server is listening at port: '+ port );

function getContentType(ext,callback){
	console.log('Extension: '+ ext);
	var rs = fs.createReadStream('./ext-content.txt');
	var content = "";
	rs.on(
		'data',
		function(data){
			content+=data.toString();
		}
	);
	
	rs.on(
		'error',
		function(err){
			return callback(err);
		}	
	);

	rs.on(
		'end',
		function(){
			var arrayType = content.split('\n');
			for(var i=0;i<arrayType.length;i++){
				var array = arrayType[i].split(':');
				if(array[0]==ext) return callback(null,array[1]);
			}
			return callback(null,'text/plain');
		}
	);
};
	
