"use strict";
var App = angular.module("App");

App.service("AuthenticationManager", ["$http", "$rootScope", "localStorageService",
	"$base64","$q", "AppConfig",
	function($http, $rootScope, localStorageService, $base64, $q, AppConfig){

		return {
			authenticate : function(username, password) {

				return $http({
					url : AppConfig.basePath + "authenticate",
					method : "POST",
					data : {
						username : username,
						password : password
					}
				}).then(function(result) {
                    var token = result.data.token;
					if(token) {
						localStorageService.set("authenticatedUser", username);
						localStorageService.set("credentials", token);
						$rootScope.$broadcast("AppAuthSuccess", username, token);
					}
					return result;
				});


			},
			isAuthenticated : function() {
				var authenticatedUser = localStorageService.get("authenticatedUser");
				return  authenticatedUser !== null;
			},
			getAuthenticatedUser : function() {
				return localStorageService.get("authenticatedUser");
				
			},
			getCredentials : function() {
				return localStorageService.get("credentials");
			},
			logout : function() {
				localStorageService.remove("authenticatedUser");
				
				localStorageService.remove("credentials");

				$rootScope.$broadcast("AppAuthCleared");
			}
		}
	}]);


App.service("User", [ "$http", "AppConfig",
	function($http, AppConfig){

		return {
			register : function(emailId, username, password) {
				return $http({
					url : AppConfig.basePath + "users",
					method : "POST",
					data : {
						username : username,
						emailId : emailId,
						password : password
					}
				});
			},
			verifyEmailId : function(username, key) {
				return $http({
					url : AppConfig.basePath + "users/"+username+"/verifyemail",
					method : "POST",
					data : {
						key : key
					}
				});
			},
			sendPasswordResetLink : function(username) {
				return $http({
					url : AppConfig.basePath + "users/"+username+"/forgotpassword",
					method : "POST",
					data : {
					}
				});
			},
			resetPassword : function(username, key, newPassword) {
				return $http({
					url : AppConfig.basePath + "users/"+username+"/resetpassword",
					method : "POST",
					data : {
						newPassword : newPassword,
						key : key
					}
				});
			},
			changePassword : function(username, oldPassword, newPassword) {
				return $http({
					url : AppConfig.basePath + "users/"+username+"/changepassword",
					method : "POST",
					data : {
						newPassword : newPassword,
						oldPassword : oldPassword
					}
				});
			}
		};
	}]);

