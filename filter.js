var fs = require('fs'),
    path=require('path');

fs.readdir(process.argv[2],function(err,listFiles){
	if(err) {console.log('Something wrong: ' + err.name); return ;}
	var ext ='.'+process.argv[3];
	for (var i=0;i<listFiles.length;i++){
		var extf = path.extname(listFiles[i]);
		if(extf===ext) console.log(listFiles[i]);
	}
});
