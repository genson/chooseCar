'use strict';

/* Controllers */
function StartGameCtrl( $scope, $http, $location ){
	$scope.userScore = 0;
	$scope.bestScore = localStorage.getItem("bestScore") || 0;
	$scope.attempts = 3;
	var gameEnd = false,
		endOfAllCars = false,
		timer;

	$scope.progressbar = {
		'status' : '',
		'width' : 0
	};

	$http.get('cars/cars.json').success( function( data ) {
		//all cars from json
		$scope.carsData = data;
		$scope.updateGame();
	});

	// $scope.progressbarLength = function( timeForChoose ){
	// 	var timeForChoose = timeForChoose || 10000;

	// 	timer = setInterval(function(){
	// 		console.log("timer is called");

 //        	$scope.$apply(function() {
 //        		var value = $scope.progressbar.width,
 //            		type;
 //            	$scope.progressbar.width = value + 0.5;
            	
 //            	if (value < 45) {
 //    			  type = 'success';
 //    			} else if (value < 70) {
 //    			  type = 'info';
 //    			} else if (value < 95) {
 //    			  type = 'warning';
 //    			} else {
 //    			  type = 'danger';
 //    			}

 //    			$scope.progressbar.status = type;
 //        	});
 //        	if ( $scope.progressbar.width = 100 ) {
 //        		clearInterval(timer);

 //        		//user don't make a choice
 //        		$scope.attempts--;

 //        		if ( $scope.attempts > 0 ) {
	// 				alert('Fail! ' + $scope.attempts + ' attemps left!');
 //        			$scope.updateGame();
 //        		} else if ( $scope.attempts == 0 ) {
 //        			alert('Game over! Your score: ' + $scope.userScore);
 //        			window.location.href = '#/main';
 //        		} else {
 //        			console.log('attempts < 0 WTF!!!');
 //        		}
 //        	} 
 //   		}, timeForChoose / 200);
	// }

	$scope.checkChoice = function( carName ) {
		if ( carName == $scope.randomCarName ) {
			alert('Rigth!');
			
			$scope.updateGame( 50 );

		} else {
			alert('Fail!');
			$scope.attempts--;
			$scope.updateGame();
		}
	}
	
	$scope.updateGame = function( /* optional */ score, /* optional */ numberOfCars ) {
		var tempArray = [],
			score = score || 0,
			numberOfCars = numberOfCars || 4,
			randomNumber = Math.floor( Math.random() * numberOfCars );
	
		$scope.userScore += score;
		$scope.bestScore = ( $scope.userScore > $scope.bestScore ) ? $scope.userScore : $scope.bestScore;
		
		//$scope.progressbarLength(10000);

		if ( gameEnd || !$scope.attempts) {
			$scope.endGame();
			return;
		} 
		
		//playing until we have a cars
		if ( $scope.carsData.length <= numberOfCars ) {

			//show only the remaining cars
			numberOfCars = $scope.carsData.length;
			
			randomNumber = Math.floor( Math.random() * $scope.carsData.length );

			gameEnd = endOfAllCars = true;

			$scope.endGame();
		}
	
		for ( var i = 0; i < numberOfCars; i++ ) {
			tempArray.push( $scope.carsData.pop() );
		}
	
		$scope.randomCarName = tempArray[ randomNumber ].name;
		$scope.cars = tempArray;


	}

	$scope.endGame = function(){
		localStorage.setItem( 'bestScore', $scope.bestScore );
		$scope.cars = [];
		//$scope.progressbar.width = 0;
		//if ( endOfAllCars ) $scope.gameResult = "Game over. You won!";
	}

	
}

function AboutCtrl( $scope ) {

}

function RecordsCtrl( ) {

}

function MainCtrl( ) {

}

myApp.controller('StartGameCtrl', [ '$scope', '$http', StartGameCtrl])
	.controller('RecordsCtrl', [ RecordsCtrl])
	.controller('AboutCtrl', [ AboutCtrl])
	.controller('MainCtrl', [ MainCtrl]);