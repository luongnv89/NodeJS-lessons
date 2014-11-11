var http=require('http');

var s=http.createServer(function(req,res){
	console.log("Received a request");
	res.end("Hey, thank for calling me!\n");
});
s.listen(8080);
