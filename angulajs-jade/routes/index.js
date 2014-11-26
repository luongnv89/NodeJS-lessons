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
	res.render('index', { title: 'Radio' });
});

router.get('/allStreams.json',function (req,res) {
	collectionDriver.findAll(collectionDB,function (err,objs) {
		if(err) {
			res.json(false);
		}else{
			res.json(objs);
		}
	});
});

router.get('/radio/:radioId',function (req,res) {
	var rsId = req.params.radioId;
	collectionDriver.get(collectionDB,rsId,function (err,doc) {
		if(err) res.json(false);
		else res.json(doc);
	});
});

router.post('/addRadio',function (req,res) {
	console.log(req.body);
	var ch = {};
	ch.name = req.body.rsName;
	ch.urls = ((req.body.urls).replace(' ','')).split(',');
	ch.tags=[];
	addTags(ch.tags,req.body.rsName,' ');
	addTags(ch.tags,req.body.rsTags,',');
	if(req.body.rsLogo!="")	ch.logo = req.body.rsLogo;
	else ch.logo = DEFAULT_LOGO;
	ch.comments={};
	ch.comments.star=[];
	ch.comments.listent=0;
	collectionDriver.save(collectionDB,ch,function (err,docs) {
		if(err){
			res.json(false);
		}else{
			res.json(docs);
		}
	});
});

router.post('/editRadio',function (req,res) {
	console.log("request body: ");
	console.log(req.body);
	var radioId=req.body.radioId;
	console.log("radio id: ");
	console.log(radioId);
	var ch = {};
	ch.name = req.body.rsName;
	ch.urls = ((req.body.urls).replace(' ','')).split(',');
	ch.tags=[];
	console.log("New item after set urls:");
	console.log(ch);
	addTags(ch.tags,req.body.rsName,' ');
	addTags(ch.tags,req.body.rsTags,',');
	if(req.body.rsLogo!="")	ch.logo = req.body.rsLogo;
	else ch.logo = DEFAULT_LOGO;
	ch.comments={};
	ch.comments.star=[];
	ch.comments.listent=0;
	console.log("New item:");
	console.log(ch);
	collectionDriver.update(collectionDB,ch,radioId,function (err,docs) {
		if(err){
			console.log("Update fail");
			console.log(err);
			res.json(err);
		}else{
			res.json(docs);
		}
	});
});

router.post('/deleteRadio/:radioId',function (req,res) {
	console.log(req.params);
	var rsId = req.params.radioId;
	collectionDriver.delete(collectionDB,rsId,function (err,docs) {
		if(err){
			res.json(false);
		}else{
			res.json(docs);
		}
	});
});

router.get('/partials/:name',function (req,res) {
	var jadeFileName = req.params.name;
	res.render('partials/'+jadeFileName);
})

function addTags (tags,stringTags,splitString) {
	var arrayString = stringTags.split(splitString);
	for(var i=0;i<arrayString.length;i++){
		var t = arrayString[i].toLowerCase();
		if(t!=" "&&tags.indexOf(t)<0) tags.push(t);
	}
}
module.exports = router;
