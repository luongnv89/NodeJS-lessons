var http=require('http'),
	url = require('url'),
	fs = require('fs');

function readListBook (nb,dirPath,callback) {
	fs.readdir(dirPath+"/",function (err,file_list) {
		// callback(err,file_list);
		if(err){
			callback(err);
		}else{
			console.log('Filtering file...');
			var dirOnly =[];
			(function interator (i) {
				if(i>=file_list.length||dirOnly.length>=nb){
					callback(null,dirOnly);
					return;
				}else{
					fs.stat(dirPath+"/"+file_list[i],function (err,stats) {
						// console.log('Cheking file: ' + file_list[i]);
						if(err){
							callback(err);
							return;
						}else{
							if(stats.isFile()){
								dirOnly.push(file_list[i]);
							}
							interator(i+1);
						}
					});
				}
			})(0);
		}
	});
}

function handleRequest (req,res) {
	console.log('Request: ' + req.method+' url: '+req.url);
	var totalURL = url.parse(req.url,true);
	console.log(totalURL);
	var dirName = totalURL.pathname;
	if(totalURL.pathname=='/'){
		dirName='.';
	}else{
		dirName=totalURL.pathname.substring(1,totalURL.pathname.length-1);
	}
	console.log('dirName: ' + dirName);
	var params = totalURL.query;
	console.log(params);
	if(params&&params.nb){
		var nb = (isNaN(params.nb)||params.nb<0)?0:params.nb;
		readListBook(nb,dirName,function (err,file_list) {
			if(err!=null){
				res.writeHead(503,{'Content-Type':'application/json'});
				res.end(JSON.stringify({error:'file-error',message:err.message})+'\n');
			}else{
				res.writeHead(200,{'Content-Type':'application/json'});
				res.end(JSON.stringify({error:'null',data:file_list})+'\n');
			}
		});
	}else{
		res.writeHead(200,{'Content-Type':'application/json'});
		res.end(JSON.stringify({error:'parameter-invalid',message:"Parameter nb does not exist"})+'\n');
	}
	
}

var s = http.createServer(handleRequest);
s.listen(8080);
console.log('Server is listening at port: ' + 8080);