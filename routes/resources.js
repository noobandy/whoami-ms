var path = require("path");

var routes = [{
	method: 'GET',
    path: '/public/{p*}',
    handler: function (request, reply) {
        reply.file(path.join(__dirname, "../", request.path));
    }
}];

module.exports = routes;