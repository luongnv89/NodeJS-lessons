var http = require('http');

var urls = [process.argv[2],process.argv[3],process.argv[4]];

var nbCompleted = 0,
	results = [];
var interactor = (function (i){
var url = urls[i];
if(i==urls.length){
	for(var j=0;j<urls.length;j++) console.log(results[j]);
}else{
console.log("Url: " + url);
	
http.get(url,function(response){
        var content = '';
        response.on('data',function(data){
                content+=data.toString();
        });
        response.on('error',function(err){
                console.error("Something wrong: " + err.name);
        });
        response.on('end',function(){
                results.push(content);
        	interactor(i+1);
	});
});
}	
})(0);


