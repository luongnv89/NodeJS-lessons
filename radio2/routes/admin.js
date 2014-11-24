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
			res.render('confirmeditpage',{admin:true,success:false,error:{code:400,message:"Cannot query to database: " + err}});
		}else{
			res.render('index', {admin:true,channels:objs,success:true,admin:true});
		}
	});
});

/* POST add new stream page */
router.post('/edit', function(req, res) {
	console.log("A stream is going to be edited: "+JSON.stringify(req.body));
	var channelId = req.body.rsId;	
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
			res.json({success:false,error:{code:400,message:"Cannot edit the channel to database: " + err}});
		}else{
			res.json({success:true,channel:docs});
		}
	});
});

/* POST edit stream page */
router.post('/delete', function(req, res) {
	console.log("A stream is going to be deleted: "+req.body.rsId);
	var channelId = req.body.rsId;
	if (channelId) {
	       collectionDriver.delete(collectionDB, channelId, function(err, objs) { //J
	       	if (err) { 
	       		res.json({success:false,error:{code:400,message:"Cannot query to get radio stream: " + channelId}});
	       	}
	       	else {
	       		res.json({success:true,channel:objs});
	       	}
	       });
	   } else {
	   	res.json({success:false,error:{code:400,message:"missing id of channel"}});
	   }
	});


function addTags (tags,stringTags,splitString) {
	var arrayString = stringTags.split(splitString);
	for(var i=0;i<arrayString.length;i++){
		var t = arrayString[i].toLowerCase();
		if(t!=" "&&tags.indexOf(t)<0) tags.push(t);
	}
}

module.exports = router;
