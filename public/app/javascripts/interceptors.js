var App = angular.module("App");

App.config(["$httpProvider",
	function($httpProvider) {

		$httpProvider.interceptors.push(["$q", "$rootScope", 
			function($q, $rootScope) {
				return {
					request : function(config) {
						if($rootScope.authenticatedUser) {
							config.headers.authorization = "Bearer "+$rootScope.credentials;
						}
						return config;
					}
				};
			}]);
	}]);