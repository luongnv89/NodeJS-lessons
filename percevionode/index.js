var http = require('http'),
	httpProxy = require('http-proxy');

httpProxy.createServer({
	hostnameOnly:true,
	router:{
		'www.callme.percevio.com':'54.77.195.11:3001',
		'www.shareme.percevio.com':'54.77.195.11:3000'
	}
}).listen(8080);