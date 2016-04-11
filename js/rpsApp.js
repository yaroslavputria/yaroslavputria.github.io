var rpsApp = angular.module('rpsApp', ["ngRoute"]);

rpsApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
	// $locationProvider.html5Mode({
	// 	enabled: true,
	// 	requireBase: false
	// });
	$routeProvider.when('/gamespace', {
		templateUrl:'views/gameSpace.html',
		controller:'rpsCtrl'
	});
	$routeProvider.when('/userinfo', {
		templateUrl:'views/userInfo.html',
		controller:'rpsCtrl'
	});
	$routeProvider.when('/maincard', {
		templateUrl:'views/mainCard.html',
		controller:'rpsCtrl'
	});
	$routeProvider.otherwise({redirectTo: '/maincard'});//маршрут за замовчуванням
}]);

// rpsApp.run(function($rootScope, $timeout, $templateCache) {
//     $rootScope.$on('$routeChangeStart', function(event, next, current) {
//         if (typeof(current) !== 'undefined'){
//             $templateCache.remove(current.templateUrl);//видалення кешування для маршрута, на який здійснюється перехід
//         }

//     });
rpsApp.controller("mainCardCtrl", ["$scope", "$timeout", "$location", function($scope, $timeout, $location){

}]);
rpsApp.controller("rpsCtrl", ["$scope", "$timeout", "$http", "$location", "$route", "$templateCache", function($scope, $timeout, $http, $location, $route, $templateCache){

$scope.$on('$routeChangeStart',  function(event, next, current){
       if (typeof(current) !== 'undefined'){
            $templateCache.remove(next.templateUrl);
            console.log(next);
            console.log(current);
        }
});

//тимчасовий масив статистики
var arrOfStats = [];
for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 3; j++) {
		for (var k = 0; k < 3; k++) {
			for (var l = 0; l < 3; l++) {
				var tmpIndex = "" + i + j + k + l;
				arrOfStats[tmpIndex] = { 0:randomInteger(0,1), 1:randomInteger(0,1), 2:randomInteger(0,1) };
			};
		};
	};
};

//тимчасовий масив ходів
var arrOfMoves = [];
for (var i = 0; i < 20; i++) {
	arrOfMoves.push("" + randomInteger(0,2) + randomInteger(0,2));
};
function randomInteger(min, max) {
	var rand = min + Math.random() * (max - min)
	rand = Math.round(rand);
	return rand;
};

//звернення до статистики
function userHandFromStats(currentSituation) {
	var result = 0,
	tmp = arrOfStats[currentSituation][result];
	for (var i = 1; i < 3; i++){
		if(arrOfStats[currentSituation][i] > tmp){
			tmp = arrOfStats[currentSituation][i];
			result = i;
		};
	};
	return result;//повертає руку, яку найчастіше використовує гравець "за даних обставин"
};

// вибір ходу пк відносно ходу гравця зі статистики
function choseMove(userHand){
	switch(userHand){
		case 0: {
			return 1;
		};
		break;
		case 1: {
			return 2;
		};
		break;
		case 2: {
			return 0;
		};
		break;
	};
};

//поточне значення руки гравця
function myCurrentHand(){
	var myMove = myHand.children()[0].classList;
	if(myMove.contains("fa-hand-rock-o")){
		return 0;
	} else if (myMove.contains("fa-hand-paper-o")){
		return 1;
	} else if (myMove.contains("fa-hand-scissors-o")){
		return 2;
	};
};

//зміна руки пк в DOM-дереві
function makePcMove(pcMove){
	var el = $("#pcHand i");
	switch(pcMove){
		case 0: {
			el.removeClass();
			el.addClass("fa fa-diamond");
		};
		break;
		case 1: {
			el.removeClass();
			el.addClass("fa fa-file-o");
		};
		break;
		case 2: {
			el.removeClass();
			el.addClass("fa fa-scissors fa-flip-horizontal");
		};
		break;
	};
};

//визначення результату ходу(порівняння руки пк та гравця)
function compareMoves (pcMove) {
	var myMove = myCurrentHand();
	if (pcMove === myMove){
		return 2;
	} else if((myMove===0 && pcMove===2)||(myMove===2 && pcMove===1)||(myMove===1 && pcMove===0)){
		return 0;
	} else if((myMove===2 && pcMove===0)||(myMove===1 && pcMove===2)||(myMove===0 && pcMove===1)){
		return 1;
	};
};

//рухунок
$scope.pcScore = 0;
$scope.myScore = 0;
$scope.drawScore = 0;
$scope.resMessage;
//опрацювання результату партії
function resultProcessing (res) {
	switch(res){
		case 0: {
			$scope.myScore++;
			$scope.resMessage = "You won!!!";
		};
		break;
		case 1: {
			$scope.pcScore++;
			$scope.resMessage = "You lost!!!";
		};
		break;
			case 2: {// is it needed? :)
	$scope.drawScore++;
	$scope.resMessage = "Its draw!";
};
break;
};
$scope.$apply();
console.log($scope.myScore, $scope.drawScore, $scope.pcScore);
}

//оновлення масиву статистики
function refreshArrOfStats (currentSituation, currentMove) {
	arrOfStats[currentSituation][currentMove]++;
}

//хід
function move(){
	var pcMove,
	currentMove = myCurrentHand(),
	lastMove = arrOfMoves.length - 1,
	preLastMove = lastMove - 1,
	currentSituation = "" + arrOfMoves[preLastMove] + arrOfMoves[lastMove],
	userHandStats = userHandFromStats(currentSituation);

	pcMove = choseMove(userHandStats);
	makePcMove(pcMove);
	currentMoveResult = compareMoves(pcMove);


	resultProcessing(currentMoveResult);

		arrOfMoves.push("" + currentMove + currentMoveResult);//додаємо поточний хід в масив ходів
		refreshArrOfStats(currentSituation, currentMove);

	};
//+++++++++++++++++++++++++++++++++++++++++++++++

var myHand = angular.element(document.getElementById("myHand")),
PCHand = angular.element(document.getElementById("pcHand")),
scoreRow = angular.element(document.getElementById("scoreRow")),
stepConditionRow = angular.element(document.getElementById("stepConditionRow")),
againstPCRow = angular.element(document.getElementById("againstPCRow")),
rpsOptionsRow = angular.element(document.getElementById("rpsOptionsRow")),
rpsOptions = angular.element(document.querySelectorAll(".rps-window-option"));

//+++++++++++++++++++++++++++++++++++++++++++++++

myHand.on("click", function(e){
	     var moveToChoseOption = $timeout(function(){
		scoreRow.slideToggle(0);
		stepConditionRow.slideToggle(0);
		againstPCRow.slideToggle(0);
		rpsOptionsRow.slideToggle(0);
	}, 300);

});
rpsOptions.on("click", function(e){
	 var choseOption = $timeout(function(){
		scoreRow.slideToggle(0);
		stepConditionRow.slideToggle(0);
		againstPCRow.slideToggle(0);
		rpsOptionsRow.slideToggle(0);
		myHand.children()[0].remove();
// 		if(!myHand.children()[0].remove()){
// console.log("iiiiiieeeeeeeee");///////////////////
// 		};
var chosenOption = angular.element(e.currentTarget).children()[0];
myHand.append(chosenOption.cloneNode());
move();
}, 300);

});
}]);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// rpsApp.directive("mainInfoCard", function () {
//     return function (scope, element, attrs) {
//          		var tmpBold = angular.element(document.createElement('b'));
//          		tmpBold.text("bbbooollldd");
//          		element.append(tmpBold);
//         }
// });