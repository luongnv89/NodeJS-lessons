var fs = require('fs');

var contentBuffer = fs.readFileSync(process.argv[2]);
var contentString = contentBuffer.toString();
var arrayLines = contentString.split('\n');
console.log(arrayLines.length-1);
