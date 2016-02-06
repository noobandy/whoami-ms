var path = require("path");

module.exports = [{
	method: 'GET',
    path: '/public/{p*}',
    handler: function (request, reply) {
        reply.file(path.join(__dirname, "../", request.path));
    }
}];