var connect = require('http'),
	helloMidware = require('./helloMidware');


var app = connect.createServer(helloMidware);
app.listen(8080);
