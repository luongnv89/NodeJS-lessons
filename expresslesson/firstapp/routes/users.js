var express = require('express'),
	udata = require('../data/users');
var router = express.Router();
var bodyParser = require('body-parser'),
	methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/', function(req, res) {
  res.render('users/index',{title:"User list",users:udata});
});

router.get('/new', function(req, res) {
  res.render('users/new',{title:"Create new user"});
});

router.get('/:name', function(req, res,next) {
	var username =req.params.name; 
	var user = udata[username];
	if(user){
		console.log('Get profile page for: ' + user.username);
		res.render('users/profile',{title:'User profile',user:user});
	}else{
		console.log('Cannot find information of: ' + username);
		next();
	}
});

router.post('/', function(req, res) {
	console.log('Data: ' + JSON.stringify(req.body));	
	if(udata[req.body.username]){
		res.end('Conflict',409);
	}else{
		udata[req.body.username] = req.body;
		res.redirect('users');
	}
});

router.del('/:name', function(req, res,next) {
	if(udata[req.params.name]){
		delete udata[req.params.name];
		res.redirect('users');
	}else{
		next();
	}

});

module.exports = router;
