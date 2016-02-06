module.exports = [{
	method : "GET",
	path : "/",
	handler : function(request, reply) {
		reply.view("index", {"title": "Template App", message : "Hello'World!!!"});
	},
	config : {
		auth : "token"
	}
}];