"use strict";

var App = angular.module("App", ["ngResource","ui.router", "ui.bootstrap", "LocalStorageModule",
	"pascalprecht.translate", "angular-loading-bar", "base64"]);

App.constant("AppConfig", {
	basePath : "http://localhost:3000/"
});

App.config(["localStorageServiceProvider",
	function(localStorageServiceProvider) {
		localStorageServiceProvider.setStorageType('sessionStorage');
		localStorageServiceProvider.setPrefix("App");
	}]);

App.config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.spinnerTemplate = '<div id="pluswrap">\
	<div class="plus">\
	<img src="/public/app/images/loader.gif">\
	</div>\
	</div>';

}]);


App.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		files: [{
			prefix: '/public/app/languages/',
			suffix: '.json'
		}]
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.fallbackLanguage('en');
}]);


//listen for authenticated events and set/unset authenticatedUser on root scope
App.run(["$rootScope", "AuthenticationManager",
	function($rootScope, AuthenticationManager) {
		$rootScope.$on("AppAuthSuccess", function(event, authenticatedUser, credentials) {
			$rootScope.authenticatedUser = authenticatedUser
			$rootScope.credentials = credentials;
		});

		$rootScope.$on("AppAuthFailed", function(event) {
			delete $rootScope.authenticatedUser;
			delete $rootScope.credentials;
		});

		$rootScope.$on("AppAuthCleared", function(event) {
			delete $rootScope.authenticatedUser;
			delete $rootScope.credentials;
		});

	}]);

App.run(["$rootScope", "AuthenticationManager", 
	function($rootScope, AuthenticationManager) {
		if(AuthenticationManager.isAuthenticated()) {
			$rootScope.authenticatedUser = AuthenticationManager.getAuthenticatedUser();
			$rootScope.credentials = AuthenticationManager.getCredentials();
		}
	}]);
