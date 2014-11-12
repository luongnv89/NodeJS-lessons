var request = require('request'),
	inspect = require('util').inspect,
	options = {
		url:'http://localhost:4000/test/hehe',
		method:'put',
		headers:{
			'X-my-header':'luongnv89'
		}
	};
request(options,
	function(err,res,body){
		if(err) throw err;
		console.log(inspect({
			err:err,
			res:{
				statusCode:res.statusCode,
				headers:res.headers
			},
			body:JSON.parse(body)
		}));
	}
);
