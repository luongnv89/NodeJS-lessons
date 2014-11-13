exports.index = function(req,res){
	res.render('default',{title:"Home page", classname:'home'});
};
exports.about = function(req,res){
	res.render('default',{title:"About page",classname:'about'});
};