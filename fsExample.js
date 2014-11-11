var fs = require('fs');

fs.stat('/etc/passwd',function(err,stats){
	if(err) return console.error(err);
	console.log('is file? '+ stats.isFile());
	console.log('is directory? '+ stats.isDirectory());
	console.log('is blockdevice? '+ stats.isBlockDevice());
	console.log('is character device? '+ stats.isCharacterDevice());
	console.log('is symbolic Link? '+ stats.isSymbolicLink());
	//console.log('is Fifo? '+ stats.isFifo());
	console.log('is socket? '+ stats.isSocket());
});
