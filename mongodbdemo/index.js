var MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
CollectionDriver = require('./collectionDriver').CollectionDriver;

var mongoHost = "localhost",

mongoPort = 27017,

collectionDriver;

var mongoClient = new MongoClient(new Server(mongoHost,mongoPort));
mongoClient.open(function (err,mongoClient) {
	if(!mongoClient){
		console.error("Error! Exiting ... Must start mongoDB first");
		process.exit(1);
	}

	var db = mongoClient.db('radioDatabase');
	collectionDriver = new CollectionDriver(db);
});

var http = require('http'),
	express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.set('port',process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.get('/',function (req,res) {
	res.render('index',{title:'Welcome page'});
});

app.get('/:collection',function (req,res) {
	var params = req.params;
	collectionDriver.findAll(req.params.collection,function (err,objs) {
		if(err) {
			openErrorPage(res,url,400,err);
		}else{
			if(req.params.collection=='radiodb'){
				res.render('radiodb',{title:'Radio database',data:objs});
			}else{
				returnData(res,objs);
			}
		}
	});
});

function returnData (res,objs) {
	res.writeHeader(200,{'Content-Type':'application/json'}); //G
    res.end(JSON.stringify(objs)); //H
}

function openErrorPage (res,url,errCode,err) {
	res.render('error',{title:'Error!',url:url,errCode:errCode,errMessage:JSON.stringify(err)});
}


app.get('/:collection/:entity', function(req, res) { //I
   var params = req.params;
   var entity = params.entity;
   var collection = params.collection;
   if (entity) {
       collectionDriver.get(collection, entity, function(err, objs) { //J
          if (err) { openErrorPage(res,req.url,400,err) }
          else { returnData(res,objs) } //K
       });
   } else {
      openErrorPage(res,req.url,400,err)
   }
});

app.post('/:collection',function (req,res) {
	var object = req.body;
	var collection = req.params.collection;
	collectionDriver.save(collection,object,function (err,docs) {
		if(err) {
			openErrorPage(res,req.url,400,err)
		}else{
			returnData(res,docs);
		}
	});
});

app.put('/:collection/:entity', function(req, res) { //A
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {
       collectionDriver.update(collection, req.body, entity, function(err, objs) { //B
          if (err) { openErrorPage(res,req.url,400,err) }
          else { returnData(res,objs); } //C
       });
   } else {
       var err = { "message" : "Cannot PUT a whole collection" };
      openErrorPage(res,req.url,400,err)
   }
});

app.delete('/:collection/:entity', function(req, res) { //A
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {
       collectionDriver.delete(collection, entity, function(err, objs) { //B
          if (err) { openErrorPage(res,req.url,400,err); }
          else {returnData(res,objs); } //C 200 b/c includes the original doc
       });
   } else {
       var err = { "message" : "Cannot DELETE a whole collection" };
       openErrorPage(res,req.url,400,err);
   }
});


app.use(function (req,res) {
	res.render('error',{title:'404 error',url:req.url,errCode:404,errMessage:'There are something wrong!'});
});

http.createServer(app).listen(app.get('port'),function () {
	console.log("Server is listeing on port: " + app.get('port'));
});

var allChannels= require('./data/data.json');
function loadDataToDB() {
	var id=0;
	allChannels.data.forEach(function (ch) {
		ch._id = id;
		id++;
		ch.language = allChannels.langs[ch.language];
		ch.category = allChannels.cats[ch.category];
		collectionDriver.save('radiodb',ch,function (err,doc) {
			if(err) {
				console.error("Error:"+err);
			}else{
				console.log(JSON.stringify(ch)+' is saved to database');
			}
		});
	});
};