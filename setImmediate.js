var startTime = (new Date()).getTime();
setTimeout(function () {
	var endTime = (new Date()).getTime();
	console.log("Hello :D!" + (endTime-startTime));
},2000);

function countdown(nb){
	var sum = [];
	var i=0;
	function sub_computing(){
		if(i<nb){
			for(var j=0;j<nb;j++){
				if(j===i*i){
					sum.push(j);
					console.log('Push: ' + j);				
				}
			}
			i++;
			setImmediate(sub_computing);	
		} else{
			var endTime = (new Date()).getTime();
			console.log('Total Time: ' + (endTime-startTime));
			console.log('Total element: ' + sum.length);		
		}
	}
	sub_computing();
}
countdown(100000);
