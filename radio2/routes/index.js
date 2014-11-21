var DEFAULT_LOGO = '/images/defaultRsLogo.png';
var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	CollectionDriver = require('../collectionDriver').CollectionDriver;

var mongoHost = "localhost",
	mongoPort = 27017,
	collectionDriver,
	collectionDB = 'channelDB';

var mongoClient = new MongoClient(new Server(mongoHost,mongoPort));
mongoClient.open(function (err,mongoClient) {
	if(!mongoClient){
		console.error("Error! Exiting ... Must start mongoDB first");
		process.exit(1);
	}
	var db = mongoClient.db('radio2db');
	collectionDriver = new CollectionDriver(db);
});


/* GET home page. */
router.get('/', function(req, res) {
	collectionDriver.findAll(collectionDB,function (err,objs) {
		if(err) {
			res.render('index',{title:'enjoy every moments',slogan:"Radio Online",success:false,error:{code:400,message:"Cannot query to database: " + err}});
		}else{
		res.render('index', { title:'enjoy every moments',slogan:"Radio Online",success:true,channels:objs});
		}
	});
});

/* GET search page. */
router.get('/search/:keys', function(req, res) {
  var tagname = req.params.keys;
	collectionDriver.getByTagname(collectionDB,tagname,function (err,objs) {
		if(err) {
			res.render('index',{title:'enjoy every moments',slogan:"Radio Online",success:false,error:{code:400,message:"Cannot query to database: " + JSON.stringify(err)}});
		}else{
			// res.render('index', { title:'enjoy every moments',success:true,slogan:"Radio Online",channels:objs});
			res.json(objs);
		}
	});
});

/* GET tags page. */
router.get('/tags/:tagname', function(req, res) {
	var tagname = req.params.tagname;
	collectionDriver.getByTagname(collectionDB,tagname,function (err,objs) {
		if(err) {
			res.render('index',{title:'enjoy every moments',slogan:"Radio Online",success:false,error:{code:400,message:"Cannot query to database: " + JSON.stringify(err)}});
		}else{
			res.render('index', { title:'enjoy every moments',success:true,slogan:"Radio Online",channels:objs});
		}
	});
});

/* GET add new stream page */
router.get('/addnew', function(req, res) {
  res.render('addnewpage', { title: 'add new stream',slogan:"Radio online"});
});

/* POST add new stream page */
router.post('/addnew', function(req, res) {
	console.log("New data is comming: " + JSON.stringify(req.body));
	var ch = {};
	ch.name = req.body.rsName;
	ch.urls = ((req.body.rsUrls).replace(' ','')).split(',');
	addTags(ch.tags,req.body.rsName,' ');
	addTags(ch.tags,req.body.rsTags,',');
	ch.logo = req.body.rsLogo;
	if(ch.logo=="") ch.logo = DEFAULT_LOGO;
	ch.comments={};
	ch.comments.star=[];
	ch.comments.listent=0;
	ch.last_updated_at = new Date();
	collectionDriver.save(collectionDB,ch,function (err,docs) {
		if(err){
			res.render('confirmaddpage',{title:'add new stream',slogan:"Radio Online",success:false,error:{code:400,message:"Cannot add to database: " + err}});
		}else{
			res.render('confirmaddpage', { title: 'add new stream ',slogan:"Radio online",success:true,channel:docs});
		}
	});
});

function addTags (tags,stringTags,splitString) {
	var arrayString = stringTags.split(splitString);
	for(var i=0;i<arrayString.length;i++){
		var t = arrayString[i].toLowerCase();
		if(t!=" "&&tags.indexOf(t)<0) tags.push(t);
	}
}
module.exports = router;
