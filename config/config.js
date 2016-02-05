var fs = require("fs");
var path = require("path");

var nconf = require("nconf");

var loaded = false;

module.exports = {
	get : function(key) {

		if(!loaded) {
			var configFileName = process.env.NODE_ENV.trim() + ".json";
			nconf.file(path.join(__dirname, configFileName));
			loaded = true;
		}
		return nconf.get(key);
	},

	set : function(key, value) {
		throw {name : "not implemented", message : "not implemented"};
	}
};