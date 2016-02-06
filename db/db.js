var path = require("path");
var mongodb = require("mongodb");

var config = require(path.join(__dirname, "../config/config"));

var MongoClient = mongodb.MongoClient;

var dbObj = null;
 
module.exports = {
	getDB : function(cb) {
		if(!dbObj) {
			
			MongoClient.connect(config.get("mongo:url"), function(err, db) {
				if(err) {
					console.log(err);
					return cb(err);
				}

				console.log("mongo connection created");

				dbObj = db;
				process.on("SIGINT", function() {
					dbObj.close();
					console.log("mongo connection closed");
				});

				return cb(null, dbObj);
			});
		} else {
			return cb(null, dbObj);
		}
	}
};

