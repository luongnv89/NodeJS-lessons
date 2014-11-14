var express = require('express');
var router = express.Router();
var allChannels= require('../data/data.json');
var data = allChannels.data;
data.forEach(function(channel){
	channel.lang = allChannels.langs[channel.language];
	channel.cat = allChannels.cats[channel.category];
	channel.logo = "/"+channel.logo;
});

router.get('/:filter1', function(req, res) {
	console.log(req.params);
	var listChannels  = [],
		f1 = req.params.filter1,
		f2 = req.params.filter2;
	if(f1=='language'){
		data.sort(function(a,b){
			var al = a.language,
			bl = b.language;
			if(al<bl) return -1;
			if(al>bl) return 1;
			return 0;
		});
		allChannels.langs.forEach(function(lang){
			var cat = {};
			cat.name = lang.toUpperCase();
			cat.list = [];
			listChannels.push(cat);
		});
		var id = 0;
		data.forEach(function(channel){
			channel.id = id;
			listChannels[channel.language].list.push(channel);
			id++;
		});
	}else if(f1=='category'){
		data.sort(function(a,b){
			var al = a.category,
			bl = b.category;
			if(al<bl) return -1;
			if(al>bl) return 1;
			return 0;
		});
		allChannels.cats.forEach(function(c){
			var cat = {};
			cat.name = c.toUpperCase();
			cat.list = [];
			listChannels.push(cat);
		});
		var id = 0;
		data.forEach(function(channel){
			channel.id = id;
			channel.lang = allChannels.langs[channel.language];
			channel.cat = allChannels.cats[channel.category];
			listChannels[channel.category].list.push(channel);
			id++;
		});
	}
	//console.log(JSON.stringify(listChannels));
	res.render('compact', { title: 'Radio online', listChannel:listChannels});
});

/* GET home page. */
router.get('/:filter1/:filter2', function(req, res) {
	console.log(req.params);
	var listChannels  = [],
		f1 = req.params.filter1,
		f2 = req.params.filter2;
	if(f1=='language'){
		data.sort(function(a,b){
			var al = a.language,
			bl = b.language;
			if(al<bl) return -1;
			if(al>bl) return 1;
			return 0;
		});

		if(allChannels.langs.indexOf(f2.toLowerCase())>=0){
			var catList = {},
			id = 0;
			catList.name=f2.toUpperCase();
			catList.list=[];
			data.forEach(function(channel){
				if(channel.lang.toUpperCase()==catList.name){
					channel.id = id;
					catList.list.push(channel);
					id++;
				}
			});
			listChannels.push(catList);
		}
	}else if(f1=='category'){
		data.sort(function(a,b){
			var al = a.category,
			bl = b.category;
			if(al<bl) return -1;
			if(al>bl) return 1;
			return 0;
		});
		if(allChannels.cats.indexOf(f2)>=0){
			var catList = {},
			id = 0;
			catList.name=f2.toUpperCase();
			catList.list=[];
			data.forEach(function(channel){
				if(channel.cat.toUpperCase()==catList.name){
					channel.id = id;
					catList.list.push(channel);
					id++;
				}
			});
			listChannels.push(catList);
		}
	}
	//console.log(JSON.stringify(listChannels));
	res.render('compact', { title: 'Radio online', listChannel:listChannels});
});

module.exports = router;
