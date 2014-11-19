var application_root = __dirname,
	express = require('express'),
	vhost = require('vhost');
function createVirtualHost(domainName,dirPath){
	var vHost = require(dirPath);
	return vhost(domainName,vHost);
}

var app = express();

var tiktukHost = createVirtualHost('tiktuk.me',"./sharemenode/app.js");
var url5itHost = createVirtualHost('url5.it',"./callmenode/app.js");

app.use(tiktukHost);
app.use(url5itHost);

app.listen(80,function(){
	console.log('I am listening on port: 80');
});
