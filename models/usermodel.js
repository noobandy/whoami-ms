"use strict";

const internals = {
	collectionName : "users"
};

internals.register = function(registrationData, callback) {

	internals.collection.insert(registrationData, function(err, user) {

		if(err) {
			return callback(err);
		}

		return callback(null, user);
	});
};

internals.findByUsername = function(username, callback) {
	internals.collection.find({username : username}, function(err, user) {
		
		if(err) {
			return callback(err);
		}

		return callback(null, user);
	});
};

internals.verifyPassword = function(username, password, callback) {

	internals.findByUsername(username, function(err, user) {

		if(err) {
			return callback(err);
		}

		return callback(null, user.password === password);
	});
};



internals.findAll = function(callback) {
	internals.collection.find({}, function(err, users) {

		if(err) {
			return callback(err);
		}

		return callback(null, users);
	});

};


module.exports.User = function(database) {
	internals.collection = database.collection(internals.collectionName);

	return {
		register : internals.register,
		findByUsername : internals.findByUsername,
		verifyPassword : internals.verifyPassword,
		findAll : internals.findAll
	};
};

