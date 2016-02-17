"use strict";

angular.module("App").config(["$stateProvider", "$urlRouterProvider", 
	function($stateProvider, $urlRouterProvider) {
	
	// For any unmatched url, redirect to /
  	$urlRouterProvider.otherwise("/");

	$stateProvider.state({
		name : "home",
		url : "/",
		templateUrl : "/public/admin/templates/home.html",
		controller : "HomeController",
		data : {
			secure : false
		}
	});
}]);



//ensure that user is authecticate before state change for secure states
App.run(["$rootScope", "AuthenticationManager",
	function($rootScope, AuthenticationManager) {
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			if(toState.data && toState.data.secure  && !AuthenticationManager.isAuthenticated()) {
				event.preventDefault();
			}
		});
	}]);