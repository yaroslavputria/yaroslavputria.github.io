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
		PCHand = angular.element(document.getElementById("PC-hand")),
		scoreRow = angular.element(document.getElementById("scoreRow")),
		stepConditionRow = angular.element(document.getElementById("stepConditionRow")),
		againstPCRow = angular.element(document.getElementById("againstPCRow")),
		rpsOptionsRow = angular.element(document.getElementById("rpsOptionsRow"));
	myHand.on("click", function(e){
		var myHandParent = myHand.parent();
		var PCHandParent = PCHand.parent();
		// myHand.toggleClass("bigger-font");

		scoreRow.slideToggle(0);
		stepConditionRow.slideToggle(0);
		againstPCRow.slideToggle(0);
		rpsOptionsRow.slideToggle(0);
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

rpsApp.directive("mainInfoCard", function () {
    return function (scope, element, attrs) {
         		var tmpBold = angular.element(document.createElement('b'));
         		tmpBold.text("bbbooollldd");
         		element.append(tmpBold);
        }
});