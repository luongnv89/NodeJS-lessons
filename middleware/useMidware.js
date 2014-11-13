var connect = require('http'),
	writeHeader = require('./write-header'),
	replyText = require('./replyTex');

var app = connect.createServer(writeHeader('x-header','louisnguyen'),replyText('Hello midware!'));
app.listen(8080);
