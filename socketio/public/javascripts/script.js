var socket = io();

document.addEventListener('DOMContentLoaded', function(){
	var r = document.location.search;
	r = r.replace('?','');
	if(r==''){
		roomname = prompt('Enter room name to start', 'r-'+ (new Date()).getTime());	
	}else{
		roomname = r;
	}
	socket.emit('set room',roomname);
	var config ={url:window.location.origin+'/?'+roomname,title:'Join me at ',desc:'Join me at '};
	sharebutton.createShareButton(config);
	
	name = prompt('Enter your nick name to start', 'p-'+(new Date()).getTime());
	document.getElementById('myname').innerHTML = name;
	socket.emit('set name',{room:roomname,name:name});

	var inputDOM = document.getElementById('m');
	inputDOM.addEventListener('keypress',function (event) {
			if(event.keyCode==13){
				sendMessage();
			}
		},false);
});

function sendMessage(){
	var message = document.getElementById('m');
	console.log('Send message: ' + message.value);
	socket.emit('new event',{room:roomname,message:message.value});
	message.value='';
}

socket.on('name exists',function(oldname){
	name = prompt(oldname+' already used. Please choose another name', 'p-'+(new Date()).getTime());
	document.getElementById('myname').innerHTML = name;
	socket.emit('set name',{room:roomname,name:name});
});

socket.on('new event',function(data){
	var msgDOM = createMessageDOM(data.id,data.message);
	var historyMsg= document.getElementById('listevent').querySelector('.msg-history');
	historyMsg.appendChild(msgDOM);
	historyMsg.scrollTop = historyMsg.scrollHeight;
});

socket.on('list id',function(ids){
	document.getElementById('listuser').innerHTML='';
	for(var id in ids){
		if(ids[id]!=name)
			document.getElementById('listuser').innerHTML+='<br>'+ids[id];		
	}
});

function createMessageDOM(senderId,message) {
	console.log(senderId+': ' + message);
	if(senderId==name) senderId='You';
		var msgDOM = document.createElement('div'),
		userSpan = document.createElement('span'),
		messageContent = document.createElement('span'),
		msgTime = document.createElement('span');
		if(senderId!='You'){
			userSpan.setAttribute('class','send-user');
		}else{
			userSpan.setAttribute('class','reply-user');
		}
		msgDOM.setAttribute('class', 'message')
		messageContent.setAttribute('class','message-text');
		msgTime.setAttribute('class', 'message-time');
		userSpan.innerHTML=senderId;
		messageContent.innerHTML=message;
		msgTime.innerHTML = new Date();
		msgDOM.appendChild(userSpan);
		msgDOM.appendChild(messageContent);
		msgDOM.appendChild(msgTime);
		return msgDOM;
}