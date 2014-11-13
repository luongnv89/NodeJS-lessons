var express = require('express');

var app = express();

var routes = require('./routes');


app.set('view engine','ejs');
app.set('views',__dirname+'/views');

app.get('/',routes.index);
app.get('/about',routes.about);

app.get('*',function(req,res){
	res.send('Bad rout!');
});



var server = app.listen(3000,function(){
	console.log('Listening on port: 3000');
});
