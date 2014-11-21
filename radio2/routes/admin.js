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

/* GET radio stream managing page*/
router.get('/', function(req, res) {
	collectionDriver.findAll(collectionDB,function (err,objs) {
		if(err) {
			res.render('confirmeditpage',{title:'enjoy every moments',slogan:"Radio Online",success:false,error:{code:400,message:"Cannot query to database: " + err}});
		}else{
			res.render('adminpage', { title:'manager',slogan:"Admin",channels:objs});
		}
	});
});

/* GET edit stream page */
router.get('/edit/:rsId', function(req, res) {
	var channelId = req.params.rsId;
	if (channelId) {
	       collectionDriver.get(collectionDB, channelId, function(err, objs) { //J
	       	if (err) { 
	       		res.render('confirmeditpage',{title:'edit a radio stream',slogan:"Radio Online",success:false,error:{code:400,message:"Cannot query to get radio stream: " + channelId}});
	       	}
	       	else {
	       		res.render('editpage', { title:'edit a radio stream',slogan:"Radio Online",success:true,channel:objs});
	       	}
	       });
	   } else {
	   	res.render('confirmeditpage',{title:'edit a radio stream',slogan:"Radio Online",success:false,error:{code:400,message:"missing id of channel"}});
	   }
	});

/* POST add new stream page */
router.post('/edit/:rsId', function(req, res) {
	var channelId = req.params.rsId;	
	console.log("New data update is comming: " + JSON.stringify(req.body) +" for channel: " + channelId);
	var ch = {};
	ch.name = req.body.rsName;
	ch.urls = ((req.body.rsUrls).replace(' ','')).split(',');
	ch.tags = [];
	addTags(ch.tags,req.body.rsName,' ');
	addTags(ch.tags,req.body.rsTags,',');
	ch.logo = req.body.rsLogo;
	if(ch.logo=="") ch.logo = DEFAULT_LOGO;
	ch.comments={};
	ch.comments.star=[];
	ch.comments.listent=0;
	ch.last_updated_at = new Date();
	collectionDriver.update(collectionDB,ch,channelId,function (err,docs) {
		if(err){
			res.render('confirmeditpage',{title:'edit a stream',slogan:"Radio Online",success:false,error:{code:400,message:"Cannot add to database: " + err}});
		}else{
			res.render('confirmeditpage', { title: 'edit a stream ',slogan:"Radio online",success:true,channel:docs});
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
