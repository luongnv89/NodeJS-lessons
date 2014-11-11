var http=require('http'),
	qs = require('querystring');
function handleRequest (req,res) {
	console.log('Request: ' + req.method+' url: '+req.url);
	
	var jsonData="";

	req.on(
		"readable",
		function () {
			var data = req.read();
			if(typeof(data)=='string'){
				jsonData+=data;
			}else if(typeof(data)== 'object'&& data instanceof Buffer){
				jsonData+=data.toString('utf8');
			}	
		}
	);

	req.on(
		'end',
		function () {
			var out;
			if(!jsonData){
				out="I don't get any data";
			}else{
				var json;
				try{
					json = JSON.parse(jsonData);
				}catch(e){
					out="JSON.parse get error: " + e.message;
				}
			}

			if(!json){
				out="I don't get any json data";
			}else{
				out="I got some JSON data: " + jsonData;
			}
			res.end(out);	
		}	
	);
	
}

var s = http.createServer(handleRequest);
s.listen(8080);
console.log('Server is listening at port: ' + 8080);