var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('contact', { title: 'Contact page' });
});

module.exports = router;
