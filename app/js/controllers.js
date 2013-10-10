'use strict';

/* Controllers */
function StartGameCtrl( $scope, $http, $location ){
	$scope.userScore = 0;
	$scope.bestScore = localStorage.getItem("bestScore") || 0;
	$scope.attemps = 3;
	$scope.gameEnd = false;

	$http.get('cars/cars.json').success( function( data ) {
		//all cars from json
		$scope.carsData = data;
		$scope.updateGame();
	});

	$scope.progressbarLength = function( timeForChoose ){
		var timeForChoose = timeForChoose || 10000;

		var timer = setInterval(function(){
        	$scope.$apply(function() {
        		var value = $scope.progressbar.width,
            		type;
            	
            	$scope.progressbar.width = value + 0.5;
            	
            	if (value < 45) {
    			  type = 'success';
    			} else if (value < 70) {
    			  type = 'info';
    			} else if (value < 95) {
    			  type = 'warning';
    			} else {
    			  type = 'danger';
    			}

    			$scope.progressbar.status = type;
        	});
        	if (  $scope.progressbar.width >= 100 ) {
        		clearInterval(timer);

        		$scope.attemps--;
        		if ( $scope.attemps ) {
					alert('Fail! ' + $scope.attemps + ' attemps left!');
        			$scope.updateGame();
        		} else {
        			alert('You lose! Your score:' + $scope.userScore);
        			window.location.href = '#/main';
        		}
        	} 
   		}, timeForChoose / 200);
	}
	
	$scope.progressbar = {
		'status' : '',
		'width' : 0
	}

	$scope.checkChoice = function( carName ) {
		if ( carName == $scope.randomCarName ) {
			alert('Rigth!');
			
			$scope.updateGame( 50 );

		} else {
			alert('Fail!');
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
		$scope.progressbar.width = 0;
		$scope.progressbarLength(1000);

		if ( $scope.gameEnd ) {
			$scope.endGame();
			return;
		}
	
		//playing until we have a cars
		if ( $scope.carsData.length <= numberOfCars ) {

			//show only the remaining cars
			numberOfCars = $scope.carsData.length;
			
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
		$scope.gameResult = "You lose :(";
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