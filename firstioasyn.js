var fs = require('fs');

fs.readFile(process.argv[2],function(err,data){
	if(err) console.log("Something wrong: " + err.name);
	var content = data.toString();
	var arrayLines = content.split('\n');
	console.log(arrayLines.length-1);
});

