var WebSocket = require('ws')
  , ws = new WebSocket('ws://localhost:4001');
ws.on('open', function() {
    ws.send('something');
});
ws.on('message', function(message) {
    console.log('received: %s', message);
});

ws.on('error',function(err){
	console.log(err);
});