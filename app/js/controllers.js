'use strict';

/* Controllers */
function StartGameCtrl( $scope, $http ){
	$scope.userScore = 0;
	$scope.bestScore = localStorage.getItem("bestScore") || 0;
	$scope.gameEnd = false;

	$http.get('cars/cars.json').success( function( data ) {
	
		$scope.carsData = data; // храним тут все имеющие данные машин

		updateGame( $scope );

		
	});

	$scope.checkChoice = function( car ) {
		if ( car.name == $scope.randomCarName ) {
			alert('Rigth!');

			updateGame( $scope, 50 );

		} else {
			alert('wrong!');
			updateGame( $scope );
		}
	}
}


function updateGame ( $scope, score, numberOfCars ) {

	if ( $scope.gameEnd ) {
		endGame( $scope );
		return;
	}

	var tempArray = [],
		score = score || 0,
		numberOfCars = numberOfCars || 4,
		randomNumber = Math.floor( Math.random() * numberOfCars );

	$scope.userScore += score;
	$scope.bestScore = ( $scope.userScore > $scope.bestScore ) ? $scope.userScore : $scope.bestScore;

	if ( $scope.gameEnd ) {
		endGame( $scope );
		return;
	}

	for ( var i = 0, currentLength = $scope.carsData.length; i < numberOfCars; i++ ) {
		if ( currentLength <= numberOfCars ) {
			console.log('It is last cars what we have :(');
			randomNumber = Math.floor( Math.random() * currentLength );
			$scope.gameEnd = true;
		}
		
		tempArray.push( $scope.carsData.pop() );
	}

	$scope.randomCarName = tempArray[ randomNumber ].name;
	$scope.cars = tempArray;
}

function endGame( $scope ){
	localStorage.setItem( 'bestScore', $scope.bestScore );
	$scope.cars = [];
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