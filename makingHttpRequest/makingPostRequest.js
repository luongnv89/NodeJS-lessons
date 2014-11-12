var request = require('request'),
	inspect = require('util').inspect;

request.post(
	'http://localhost:4000/test/hehe',
	function(err,res,body){
		if(err) throw err;
		console.log(inspect({
			err:err,
			res:{
				statusCode:res.statusCode
			},
			body:JSON.parse(body)
		}));
	}
);
