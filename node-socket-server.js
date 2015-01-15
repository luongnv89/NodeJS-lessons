var http=require('http');
var server = http.createServer(function(req,res){});

server.listen(8080,function(){
	console.log((new Date())+' Server is listening on port: 8080');
});

var WebSocketServer = require('websocket').server;

var wsServer = new WebSocketServer({
	httpServer:server
});

var count = 0;
var clients = {};

wsServer.on('request',function(r){
	var connection = r.accept('echo-protocol',r.origin);
	var id=count++;
	clients[id] = connection;
	console.log((new Date())+'connection accepted: ' + id);
	connection.on('message',function(message){
		var msgString = message.utf8Data;
		for (var c in clients){
			clients[c].sendUTF(msgString);
		}
	});

	connection.on('close',function(reasonCode,description){
		delete clients[id];
		console.log((new Date())+' peer ' + connection.remoteAddress + ' disconnected');
	});
});

