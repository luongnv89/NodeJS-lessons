var fs = require('fs'),
	filePath = 'newFile.txt';

fs.open(filePath,'a',function(err,fd){
	if(err) throw err;
	var writeBuffer = new Buffer("This string will be written into file"),
	bufferPosition = 0,
	bufferLength = writeBuffer.length/4,
	filePosition = null;
	(function writeFile(){
		
	if(bufferPosition<writeBuffer.length){
		fs.write(fd,writeBuffer,bufferPosition,bufferLength,filePosition,function(err,written){
		if(err) throw err;
		console.log('Wrote ' + written+" bytes" );
		bufferPosition+=bufferLength;
		writeFile();
	});}}
)();
});
