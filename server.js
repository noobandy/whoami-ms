var path = require("path");
var Hapi = require("hapi");


var config = require(path.join(__dirname, "config/config"));
var index = require(path.join(__dirname, "routes/index"));
var resources = require(path.join(__dirname, "routes/resources"));

var server = new Hapi.Server();

var connection = server.connection({
	host : config.get("host"),
	port : config.get("port")
});

//route configuration
server.route(index);

//static content
server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route(resources);
});


//view engine
server.register(require('vision'), (err) => {

    server.views({
        engines: {
            html: require('handlebars'),
        },
        relativeTo: __dirname,
        path: 'views'
    });
});

//authentication

server.auth.scheme("jwt", function(server, options) {
    return {
        authenticate : function(request, reply) {
            reply(null, {});
        }
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});