var path = require("path");

module.exports = [{
	method: 'GET',
    path: '/public/{p*}',
    handler: function (request, reply) {
    	console.log(path.join(__dirname, "public", request.path));
        reply.file(path.join(__dirname, "../", request.path));
    }
}];