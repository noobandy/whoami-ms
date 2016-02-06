var path = require("path");

var Hapi = require("hapi");
var jwt = require("jsonwebtoken");
var Boom = require("boom");

var config = require(path.join(__dirname, "config/config"));
var index = require(path.join(__dirname, "routes/index"));
var login = require(path.join(__dirname, "routes/login"));
var resources = require(path.join(__dirname, "routes/resources"));

var server = new Hapi.Server();

var connection = server.connection({
	host : config.get("server:host"),
	port : config.get("server:port")
});

//authentication
server.auth.scheme("jwt", function(server, options) {
    return {
        authenticate : function(request, reply) {
            var token = request.headers.authorization;
            if(!token) {
                reply(Boom.unauthorized("Missing token", "jwt", {}),{});
            } else {
                 jwt.verify(token.split(" ")[1], options.secret, {algorithm : options.algorithm}, function(err, decoded) {
                    if(err) {
                        return reply(Boom.unauthorized("Wrong token", "jwt", {}),{});
                    }
                    reply.continue({credentials: decoded.username});
            });
            }
        }
    };
});


server.auth.strategy("token", "jwt", false, {secret : config.get("jwt:secret"), algorithm :config.get("jwt:algorithm")});


//route configuration
server.route(index);
server.route(login);

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



// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});