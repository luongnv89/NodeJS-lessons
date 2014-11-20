var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'home page'});
});

/* GET search page. */
router.get('/search/:keys', function(req, res) {
  res.render('index', { title: 'search for ' + req.params.keys});
});

/* GET tags page. */
router.get('/tags/:tagname', function(req, res) {
  res.render('index', { title: 'search for ' + req.params.tagname});
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
	ch.tags = ((req.body.rsTags).replace(' ','')).split(',');
	ch.logo = req.body.rsLogo;
	ch.comments=[];
	ch.last_updated_at = new Date();
  	res.render('confirmaddpage', { title: 'add new stream ',slogan:"Radio online",channel:ch});
});


module.exports = router;
