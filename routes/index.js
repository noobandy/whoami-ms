module.exports = [{
	method : "GET",
	path : "/",
	handler : function(request, reply) {
		var username = request.auth.credentials;

		reply.view("index", {"title": "Template App", message : "Hello "+username});
	},
	config : {
		auth : "token"
	}
}];