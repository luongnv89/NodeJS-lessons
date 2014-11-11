var exec = require('child_process').exec;

exec('cat *.js|wc -l',function(err,stdout,stderr){
	if(err){
		console.log("Error: ",err.code);
		return;
	}
	console.log(stdout);
});
