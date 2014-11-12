var request = require('request'),
	inspect = require('util').inspect,
	body={
                username:'luongnv89',
                password:'konal89'
        },
	options = {
		url:'http://localhost:4000/test/hehe',
		method:'put',
		headers:{
			'X-my-header':'luongnv89'
		},
		form:body
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
