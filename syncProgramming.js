setTimeout(function (){console.log('Done!');},100);
var fs = require('fs');
var file = fs.openSync('test.txt','r');
var bf = new Buffer(10000);
var contents = fs.readSync(file,bf,0,10000,0);
console.log(bf.toString('utf8',0,contents));