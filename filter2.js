var filter2 = require('./mymodule.js');
filter2(process.argv[2],process.argv[3],function(err,list){
	if(err==null) 
		for(var i=0;i<list.length;i++) console.log(list[i]);
	else console.log(err.name);	
});
