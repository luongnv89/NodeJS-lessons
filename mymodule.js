var fs = require('fs'),
	path = require('path');
module.exports = function (dirpath,extension,callback){
	fs.readdir(dirpath,function(err,listFiles){
		if(err) return callback(err);
		var ext = '.'+extension;
		var list = [];
		for(var i=0;i<listFiles.length;i++){
			if(path.extname(listFiles[i])===ext) list.push(listFiles[i]);
		};
		return callback(null,list);
	});
};

