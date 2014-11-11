var http=require('http');

function handleRequest (req,res) {
	console.log('Incomming request: ('+req.method+') '+ req.url);
	console.log('\n******** REQUEST ***********\n');
	console.log(req);
	res.writeHead(200,{'content-type':'application/json'});
	res.end(JSON.stringify({error:'null'}));
	console.log('\n******** RESPONSE ***********\n');
	console.log(req);
}

var s = http.createServer(handleRequest);
s.listen(8080);
console.log("Listening at port: " + 8080);