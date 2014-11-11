var http = require('http');

function requestHandler (req,res) {
	var body = "Hey, Thank for calling me. I am server 2";
	var contentLength = body.length;
	res.writeHead(200,{
		'Content-Type':"text/plain",
		'Content-Length':contentLength
	});
	res.end(body);
}

var server = http.createServer(requestHandler);

server.listen(8080);