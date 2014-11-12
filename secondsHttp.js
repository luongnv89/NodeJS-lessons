var http = require('http');

var url = process.argv[2];

http.get(url,function(response){
	var content = '';
	response.on('data',function(data){
		content+=data.toString();
	});
	response.on('error',function(err){
		console.error("Something wrong: " + err.name);
	});
	response.on('end',function(){
		console.log(content.length);
		console.log(content);
	});
});
