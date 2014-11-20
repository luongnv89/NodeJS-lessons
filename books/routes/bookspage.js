var express = require('express');
var router = express.Router();

router.get('/',function (req,res) {
	res.render('bookspage',{title:"My Bookstore"});
});

router.get('/upload',function (req,res) {
	res.render('uploadpage',{title:"My Bookstore"});
});

module.exports = router;
