var fs = require('fs'),
	filePath = './ext-content.txt',
	results = [];

var rs = fs.createReadStream(filePath,{encoding:'utf8'});

rs.on(
	'data',
	function(data){
		console.log(data);
		correctForm(data);
	}
);

rs.on(
	'end',
	function(){
		console.log('Finished reading file!');
	}
);

function correctForm(content){
	var array = content.split('\n');
	for(var i=0;i<array.length;i++){
		console.log(JSON.stringify(array[i].replace(':','":"')));
	}
	console.log("Test: " + array['.jpg']);
}
