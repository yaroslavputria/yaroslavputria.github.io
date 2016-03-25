var rpsApp = angular.module('rpsApp', []);
rpsApp.run(function($rootScope){

});
rpsApp.controller("rpsCtrl", function($scope){
	$scope.user = {
		male: 0,
		age: 12
	};
	console.log("controller is here");



	var myHand = angular.element(document.getElementById("my-hand")),
		PCHand = angular.element(document.getElementById("PC-hand"));
	myHand.on("click", function(e){
		var myHandParent = myHand.parent();
		var PCHandParent = PCHand.parent();
		myHandParent.toggleClass("s12");
		myHandParent.toggleClass("s6");
		PCHandParent.slideToggle(0);
		
	});

});
