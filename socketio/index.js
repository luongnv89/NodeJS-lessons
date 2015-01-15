var app = require('./app.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var rooms = {};

io.on('connection',function(socket){
	socket.on('set room',function(roomname){
		console.log(rooms);
		if(!rooms[roomname]){
			rooms[roomname]={};
			rooms[roomname].clients=[];
		}
		console.log(rooms);
		socket.roomname = roomname;
		rooms[roomname].clients.push(socket);
		console.log(rooms);
	});
	
	socket.on('set name',function(data){
		var roomname = data.room;
		if(!rooms[roomname]){
			socket.emit('room not exist');
		}else{
			var exist =false;
			for(var i=0;i<rooms[roomname].clients.length;i++){
				if(rooms[roomname].clients[i].clientname==data.name){
					socket.emit('name exists',data.name);
					exist = true;
					break;
				}
			}
			if(!exist){
				socket.clientname = data.name;
				var ids = getListRoomIds(socket.roomname);
				for(var i=0;i<rooms[roomname].clients.length;i++){
					if(rooms[roomname].clients[i].clientname!=data.name){
						rooms[roomname].clients[i].emit('new event',{id:data.name,message:' joined the room'});	
					}
					rooms[roomname].clients[i].emit('list id',ids);
				}
			}
		}
	});
	socket.on('disconnect',function(){
		console.log(socket.clientname+ ' disconnected');
		var room = rooms[socket.roomname];
		if(!room){
			console.log(socket.roomname+' does not exist');
		}else{
			var ids = getListRoomIds(socket.roomname);
			ids = ids.splice(socket.clientname,1);
			for(var i=0;i<room.clients.length;i++){
				if(room.clients.clientname==socket.clientname){
					room.clients.splice(i,1);
				}else{
					room.clients[i].emit('new event',{id:socket.clientname,message:' left the room'});
					room.clients[i].emit('list id',ids);
				}
			}
		}
	});

	socket.on('new event',function(msg){
		console.log(socket.clientname+'Message: ' + msg);
		var room = rooms[socket.roomname];
		for(var i=0;i<room.clients.length;i++){
			room.clients[i].emit('new event',{id:socket.clientname,message:msg.message});
		}
	});
});

function getListRoomIds(roomname){
	var room = rooms[roomname];
	if(room){
		var ids =[];
		for(var i=0;i<room.clients.length;i++){
			ids.push(room.clients[i].clientname);
		}
		return ids;
	}else{
		console.log('Room ' + roomname+' does not exist');
		return [];
	}

}
http.listen(3000,function(){
	console.log((new Date())+' server listening on port: 3000');
});	

function getAnId(){
	var str = '',
		ret = '';
		var idf = (new Date()).getTime();
		if(Number(idf)>0) str= String(idf);
		else str=String(-Number(idf));
		for(var i=0;i<str.length;i++){
			ret += String.fromCharCode(97 + (Number(str[i])));
		}
		return ret;
}