var http=require('http'),
	qs = require('querystring');
function handleRequest (req,res) {
	console.log('Request: ' + req.method+' url: '+req.url);
	
	var formData="";

	req.on(
		"readable",
		function () {
			var data = req.read();
			if(typeof(data)=='string'){
				formData+=data;
			}else if(typeof(data)== 'object'&& data instanceof Buffer){
				formData+=data.toString('utf8');
			}	
		}
	);

	req.on(
		'end',
		function () {
			var out;
			if(!formData){
				out="I don't get any data";
			}else{
				var obj = qs.parse(formData);
				if(!obj){
					out="I don't get any json data";
				}else{
					out="I got some JSON data: " + JSON.stringify(obj);
				}
			}
			res.end(out+'\n');	
		}	
	);
	
}

var s = http.createServer(handleRequest);
s.listen(8080);
console.log('Server is listening at port: ' + 8080);