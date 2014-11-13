var express = require('express');
var router = express.Router();
/*GET products page*/

router.get('/',function(req,res){
	res.render('products',{title:'Welcome to our products'});	
});
module.exports = router;
