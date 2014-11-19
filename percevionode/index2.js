var http = require('http'),
	httpProxy = require('http-proxy'),
	url = require('url');

var proxy = httpProxy.createProxyServer({});

http.createServer(function(req,res){
	var hostName = req.headers.host.split(":")[0],
		pathname=url.parse(req.url).pathname;

	console.log('Host: ' + hostName+"\n Pathname: " + pathname);
	
	switch(hostName){
		case 'tiktuk.me': case 'www.tiktuk.me':
		proxy.web(req,res,{target:'http://localhost:3001'});
		break;
		case 'url5.it': case 'www.url5.it':
		proxy.web(req,res,{target:'http://localhost:3000'});
		break;
		default:
		proxy.web(req,res,{target:'http://localhost:8888'});
	}
}).listen(80,function(){
	console.log('Listening on port: 80');
});
