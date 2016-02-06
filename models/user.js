var path = require("path");

var dal = require(path.join(__dirname, "../db/db"));

var user = {
	verifyPassword : function(username, password, cb) {
		dal.getDB(function(err, db) {
			if(err) {
				return cb(err);
			}

			var cursor = db.collection("users").find({username : username}).limit(1);
			
			var user;
			
			while(cursor.hasNext()) {
				user = cursor.next();
			}
			
			if(user && user.password === password) {
				cb(null, true);
			} else {
				cb(null, false);
			}
		});
	}
};


module.exports = user;
