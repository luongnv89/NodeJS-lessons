var express = require('express');
var router = express.Router();

/* GET radio stream managing page*/
router.get('/', function(req, res) {
	var listStreams=[];
  	res.render('adminpage', { title: 'manager',slogan:"List all streams",listStreams:listStreams});
});

/* GET edit stream page */
router.get('/edit/:rsId', function(req, res) {
	var channel={};
	channel.name="Radio stream name";
  	res.render('adminpage', { title: 'edit stream ' + channel.name,slogan:"Edit a stream",channel:channel});
});

/* POST add new stream page */
router.post('/edit/:rsId', function(req, res) {
  res.end('Return updating stream result');
});


module.exports = router;
