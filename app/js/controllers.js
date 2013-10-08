'use strict';

/* Controllers */
function StartGameCtrl( $scope, $http ){
	$scope.userScore = 0;
	$scope.bestScore = localStorage.getItem("bestScore") || 0;
	$scope.gameEnd = false;

	$http.get('cars/cars.json').success( function( data ) {
		//all cars from json
		$scope.carsData = data;
		$scope.updateGame();
	});

	$scope.checkChoice = function( car ) {
		if ( car.name == $scope.randomCarName ) {
			alert('Rigth!');
			$scope.updateGame( 50 );

		} else {
			alert('wrong!');
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
	
		if ( $scope.gameEnd ) {
			$scope.endGame();
			return;
		}
	
		//playing until we have a cars
		if ( $scope.carsData.length <= numberOfCars ) {
			randomNumber = Math.floor( Math.random() * $scope.carsData.length );
			$scope.gameEnd = true;
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