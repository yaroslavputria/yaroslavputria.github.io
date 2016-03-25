var rpsApp = angular.module('rpsApp', []);
rpsApp.controller("rpsCtrl", function($scope){
	$scope.user = {
		male: 0,
		age: 12
	};
	console.log("controller is here");
});