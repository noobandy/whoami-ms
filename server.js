"use strict";

const path = require("path");

const Hapi = require("hapi");
const Hoek = require("hoek");

const Database = require(path.join(__dirname, "db/db"));
const UserModel = new require(path.join(__dirname, "models/usermodel"));

const config = require(path.join(__dirname, "config/config"));
const index = require(path.join(__dirname, "routes/index"));
const login = require(path.join(__dirname, "routes/login"));
const resources = require(path.join(__dirname, "routes/resources"));

const internals = {

};

Database.init(config.get("db:url"), {}, function(err, connection) {

    Hoek.assert(!err, err);

    internals.connection = connection;

    internals.user = new UserModel.User(internals.connection);

});

internals.validate = function(decoded, request, callback) {
    if(decoded.username && decoded.username == "anandm") {
        return callback(null, true);
    }

    return callback(null, false);
};


const server = new Hapi.Server();

const connection = server.connection({
	host : config.get("server:host"),
	port : config.get("server:port")
});


//authentication
server.register(require('hapi-auth-jwt2'), function (err) {

    Hoek.assert(!err, err);

    server.auth.strategy('jwt', 'jwt',{
        key: config.get("jwt:secret"),          // Never Share your secret key
        validateFunc: internals.validate,            // validate function defined above
        verifyOptions: { algorithms: [ config.get("jwt:algorithm")] } // pick a strong algorithm
    });

    server.auth.default('jwt');
});

/*server.auth.scheme("jwt", function(server, options) {
    return {
        authenticate : function(request, reply) {
            const token = request.headers.authorization;
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

*/

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
    Hoek.assert(!err, err);

    console.log('Server running at:', server.info.uri);
});