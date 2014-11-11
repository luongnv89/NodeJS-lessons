var fs = require('fs'),
	filePath="writeText.txt";

var ws = fs.createWriteStream(filePath);

ws.write('This will be written into file by using writeable stream .... \n');
ws.on(
	'drain',
	function(flushed){
		console.log('flushed? ' + flushed);
	}
);
