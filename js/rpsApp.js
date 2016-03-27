var rpsApp = angular.module('rpsApp', []);
rpsApp.run(function($rootScope){

});
rpsApp.controller("rpsCtrl", function($scope){
	var myHand = angular.element(document.getElementById("myHand")),
		PCHand = angular.element(document.getElementById("pcHand")),
		scoreRow = angular.element(document.getElementById("scoreRow")),
		stepConditionRow = angular.element(document.getElementById("stepConditionRow")),
		againstPCRow = angular.element(document.getElementById("againstPCRow")),
		rpsOptionsRow = angular.element(document.getElementById("rpsOptionsRow")),
		rpsOptions = angular.element(document.querySelectorAll(".rps-window-option"));

//+++++++++++++++++++++++++++++++++++++++++++++++

//тимчасовий масив статистики
var arrOfStats = [];
for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 3; j++) {
		for (var k = 0; k < 3; k++) {
			for (var l = 0; l < 3; l++) {
				var tmpIndex = "" + i + j + k + l;
				arrOfStats[tmpIndex] = { 0:0, 1:0, 2:0 };
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

//вибір ходу за елементом масива статистики
function choseMove (currentSituation) {
	var result = 0,
		tmp = arrOfStats[currentSituation][result];
	for (var i = 1; i < 3; i++){
		if(arrOfStats[currentSituation][i] > tmp){
			tmp = arrOfStats[currentSituation][i];
			result = i;
		}
	}
	return result;
}

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

//визначення результату ходу(порівняння руки пк та гравця)
function compareMoves (pcMove) {
	var myMove = myCurrentHand();
	if (pcMove === myMove){
		return 2;
	} else if((myMove===0 && pcMove===1)||(myMove===1 && pcMove===2)||(myMove===2 && pcMove===0)){
		return 0;
	} else if((myMove===1 && pcMove===0)||(myMove===2 && pcMove===1)||(myMove===0 && pcMove===2)){
		return 1;
	};
};

//оновлення масиву статистики
function refreshArrOfStats (currentSituation) {
	var myMove = myCurrentHand();
	arrOfStats[currentSituation][myMove]++;
}

//хід
function move(){
	var currentMove, currentMoveResult,
		lastMove = arrOfMoves.length - 1,
		preLastMove = lastMove - 1,
		currentSituation = "" + arrOfMoves[lastMove] + arrOfMoves[preLastMove];
		currentMove = choseMove(currentSituation);
//////////////////
//застосування вирахуваного ходу для пк
//////////////////
		currentMoveResult = compareMoves(currentMove);
//////////////////
//опрацювання результату ходу
//////////////////
		arrOfMoves.push("" + currentMove + currentMoveResult);//додаємо поточний хід в масив ходів
		refreshArrOfStats(currentSituation);

};
//+++++++++++++++++++++++++++++++++++++++++++++++


	myHand.on("click", function(e){
		setTimeout(function() {
      scoreRow.slideToggle(0);
		stepConditionRow.slideToggle(0);
		againstPCRow.slideToggle(0);
		rpsOptionsRow.slideToggle(0);
    }, 400);
		
	});
	rpsOptions.on("click", function(e){
			setTimeout(function() {
      scoreRow.slideToggle(0);
		stepConditionRow.slideToggle(0);
		againstPCRow.slideToggle(0);
		rpsOptionsRow.slideToggle(0);
		myHand.children()[0].remove();
		var chosenOption = angular.element(e.currentTarget).children()[0];
		myHand.append(chosenOption.cloneNode());
		move();
    }, 400);
		
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// rpsApp.directive("mainInfoCard", function () {
//     return function (scope, element, attrs) {
//          		var tmpBold = angular.element(document.createElement('b'));
//          		tmpBold.text("bbbooollldd");
//          		element.append(tmpBold);
//         }
// });