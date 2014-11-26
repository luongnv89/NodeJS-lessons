var ObjectID = require('mongodb').ObjectID;

CollectionDriver = function  (db) {
	this.db = db;
}

CollectionDriver.prototype.getCollection = function (collectionName,callback) {
	this.db.collection(collectionName,function (err,theCollection) {
		if(err) callback(err);
		else callback(null,theCollection);
	});
};

CollectionDriver.prototype.findAll = function(collectionName,callback) {
	this.getCollection(collectionName,function (err,theCollection) {
		if(err) callback(err);
		else{
			theCollection.find().toArray(function(err,result){
				if(err) callback(err);
				else callback(null,result);
			});
		}
	});
};

CollectionDriver.prototype.get = function(collectionName,id,callback) {
	this.getCollection(collectionName,function (err,theCollection) {
		if(err) callback(err);
		else{
			var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
			if(!checkForHexRegExp.test(id)) callback({error:"invalid id"});
			else theCollection.findOne({'_id':ObjectID(id)},function (err,doc) {
				if(err) callback(err);
				else callback(null,doc);
			});
		}
	});
};

// CollectionDriver.prototype.getByTagname = function(collectionName,tagname,callback) {
// 	this.getCollection(collectionName,function (err,theCollection) {
// 		if(err) callback(err);
// 		else{
// 			theCollection.find({tags:tagname}).toArray(function(err,result){
// 				if(err) callback(err);
// 				else callback(null,result);
// 			});
// 		}
// 	});
// };

CollectionDriver.prototype.save = function (collectionName,obj,callback) {
	this.getCollection(collectionName,function (err,theCollection) {
		if(err) callback(err);
		else{
			obj.created_at = new Date();
			theCollection.insert(obj,function () {
				callback(null,obj);
			});
		}
	});
}

CollectionDriver.prototype.update = function(collectionName,obj,entityId,callback) {
	this.getCollection(collectionName,function (err,theCollection) {
		if(err) callback(err);
		else{
			obj._id = ObjectID(entityId);
			obj.last_updated_at = new Date();
			theCollection.save(obj,function (err,doc) {
				if(err) callback(err);
				else callback(null,obj);
			});
		}
	});
};

CollectionDriver.prototype.delete = function(collectionName,entityId,callback) {
	this.getCollection(collectionName,function (err,theCollection) {
		if(err) callback(err);
		else{
			theCollection.remove({'_id':ObjectID(entityId)},function (err,doc) {
				if(err) callback(err);
				else callback(null,doc);
			});
		}
	});
};

exports.CollectionDriver = CollectionDriver;

