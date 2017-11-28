var socket = io();

var mykey = "";// will be provided by user
var friendkey = "";// will be provided by user
var DEBUG = 1;

if(DEBUG == 0){
	console.log = function(){};
	console.debug = function() {};
	console.info = function() {};
	console.warning = function() {};
}

document.addEventListener('DOMContentLoaded', function(){
	var r = document.location.search;
	r = r.replace('?','');
	if(r==''){
		roomname = prompt('Enter room name to start', 'r-'+ (new Date()).getTime());	
		// while (name == "") {
		// 	alert("Roomname must be not null");
		// 	roomname = prompt("Enter room name to start", "r-" + new Date().getTime());	
		// }
	}else{
		roomname = r;
	}
	console.log("Room: " + window.location.origin + "/?" + roomname);
	socket.emit('set room',roomname);
	// var config ={url:window.location.origin+'/?'+roomname,title:'Join me at ',desc:'Join me at '};
	// sharebutton.createShareButton(config);
	
	name = prompt('Enter your nick name to start', 'p-'+(new Date()).getTime());
	// while (name == "") {
	// 	alert("Nick name must be not empty");
	// 	name = prompt("Enter your nick name to start", "p-" + new Date().getTime());
	// }
	document.getElementById('myname').innerHTML = name;
	socket.emit('set name',{room:roomname,name:name});

	var inputDOM = document.getElementById('m');
	inputDOM.addEventListener('keypress',function (event) {
			if(event.keyCode==13){
				sendMessage();
			}
		},false);
	mykey = prompt("Enter your secret key", "random-" + new Date().getTime());
	// while (mykey=="") {
	// 	alert('Secret key must be not empty');
	// 	mykey = prompt("Enter your secret key", "random-" + new Date().getTime());
	// }
      friendkey = prompt("Enter your friend secret key");
      // while (friendkey == "") {
      // 	alert("Secret key must be not empty");
      // 	friendkey = prompt("Enter your friend secret key");
      // }
});

function encrypt(message) {
	return CryptoJS.AES.encrypt(message, mykey).toString();
}

function decrypt(message,enkey) {
  	var bytes = CryptoJS.AES.decrypt(message.toString(), enkey);
	return bytes.toString(CryptoJS.enc.Utf8);
}

function sendMessage(){
	var message = document.getElementById('m');
	console.log('Send message: ' + message.value);
	socket.emit("new event", { room: roomname, message: encrypt(message.value) });
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
	// Encrypt message before showing
	console.log(senderId+': ' + message);
	var enkey = mykey;
	if(senderId==name) senderId='Me';
		var msgDOM = document.createElement('div'),
		userSpan = document.createElement('span'),
		messageContent = document.createElement('span'),
		msgTime = document.createElement('span');
		if(senderId!='Me'){
			userSpan.setAttribute('class','send-user');			
			enkey = friendkey;
		}else{
			userSpan.setAttribute('class','reply-user');
		}
		msgDOM.setAttribute('class', 'message')
		messageContent.setAttribute('class','message-text');
		msgTime.setAttribute('class', 'message-time');
		userSpan.innerHTML=senderId;
		messageContent.innerHTML = message;
		msgTime.innerHTML = new Date();
		msgDOM.appendChild(userSpan);
		msgDOM.appendChild(messageContent);
		msgDOM.appendChild(msgTime);
		msgDOM.addEventListener('click',function() {
			var outputMsg = decrypt(message,enkey);
			alert(outputMsg);
		})
		return msgDOM;
}