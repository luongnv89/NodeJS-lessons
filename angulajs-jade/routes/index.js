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

router.get('/partials/:name',function (req,res) {
	var jadeFileName = req.params.name;
	res.render('partials/'+jadeFileName);
})
module.exports = router;
