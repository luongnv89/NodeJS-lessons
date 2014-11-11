process.nextTick(function(){
	var a=0;
	while(true){
	a++;
	console.log(a);
	}
});

process.nextTick(function(){
	console.log("Next tick");
});


setTimeout(function(){console.log('Timeout!!!!');},1000);
