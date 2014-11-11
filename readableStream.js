var fs = require('fs'),
	filePath = "./textstream.txt";

var rs = fs.createReadStream(filePath,{encoding:'utf8',end:100});

rs.on(
	'data',
	function(data){
		console.log("\n\n\n\n\n\n-----------Read data: " + data);
	}
);

rs.on(
	'error',
	function(err){
		console.error("Something wrong: " + err);
	}
);

rs.on(
	'end',
	function(){
		console.log("--- Completed reading file ! --- ");
	}
);
