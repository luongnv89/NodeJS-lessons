var http = require('http');

var url = process.argv[2];

http.get(url,function(response){
	response.on('data',function(data){
		console.log(data.toString());
	});
	response.on('error',function(err){
		console.error("Something wrong: " + err.name);
	});
	response.on('end',function(){
	});
});
