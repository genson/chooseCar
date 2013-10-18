'use strict';

/* Controllers */
function StartGameCtrl( $scope, $http, $timeout, $location ){
	$scope.userScore = 0;
	$scope.bestScore = localStorage.getItem("bestScore") || 0;
	$scope.attempts = 3;

	var gameEnd = false,
		//endOfAllCars = false,
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

//    $scope.counter = 0;
//    $scope.onTimeout = function(){
//        $scope.counter++;
//        mytimeout = $timeout($scope.onTimeout,1000);
//    }
//    var mytimeout = $timeout($scope.onTimeout,1000);



	$scope.progressbarLength = function( timeForChoose ){
	    var timeForChoose = timeForChoose || 10000;

        var value = $scope.progressbar.width,
            type;

        $scope.progressbar.width += 0.5;




			console.log("timer is called");

             	if ( value < 45 ) {
     			  type = 'success';
     			} else if ( value < 70 ) {
     			  type = 'info';
     			} else if ( value < 95 ) {
     			  type = 'warning';
     			} else {
     			  type = 'danger';
     			}

     			$scope.progressbar.status = type;

             // watch for width of progressbar
            $scope.$watch('progressbar',function( value ) {
                console.log( value.width );
                if ( value.width == 100 ) {
                    $timeout.cancel(mytimeout);
                    console.log('timer was cancelled');
                }
            });


         	if ( $scope.progressbar.width >= 100 ) {

                console.log('width of progressbar still counting');
         		//user don't make a choice
         		$scope.attempts--;

         		if ( $scope.attempts > 0 && !gameEnd) {
					alert('Fail! ' + $scope.attempts + ' attemps left!');
         			$scope.updateGame();
         		} else if ( $scope.attempts == 0 ) {

                    $scope.endGame();
                    alert('Game over! Your score: ' + $scope.userScore);
                    $timeout.cancel(mytimeout);
         			window.location.href = '#/main';
                } else {

                    $timeout.cancel(mytimeout);
                    $scope.endGame();
                    alert( 'You win! ' + $scope.userScore );

                }
         	}

        if ( !gameEnd ) {
            mytimeout = $timeout($scope.progressbarLength, 200);
        } else {
            console.log('trouble here :D');
            $timeout.cancel(mytimeout);
        }
	};

    var mytimeout = $timeout($scope.progressbarLength, 1);

	$scope.checkChoice = function( carName ) {
		if ( carName == $scope.randomCarName ) {
			alert('Rigth!');
            $timeout.cancel(mytimeout);
			$scope.updateGame( 50 );

		} else {
			alert('Fail!');
            $timeout.cancel(mytimeout);
			$scope.attempts--;
			$scope.updateGame();
		}
	};
	
	$scope.updateGame = function( /* optional */ score, /* optional */ numberOfCars ) {
		var tempArray = [],
			score = score || 0,
			numberOfCars = numberOfCars || 4,
			randomNumber = Math.floor( Math.random() * numberOfCars );
	
		//add score and change best score
		$scope.userScore += score;
		$scope.bestScore = ( $scope.userScore > $scope.bestScore ) ? $scope.userScore : $scope.bestScore;

        $scope.progressbar.width = 0;

		if ( gameEnd || !$scope.attempts || !$scope.carsData.length ) {
			$scope.endGame();
			return;
		} else {
            console.log('not end game');
            $scope.progressbarLength(10000);
        }


		
		//playing until we have a cars
		if ( $scope.carsData.length <= numberOfCars ) {
			//show only the remaining cars
			numberOfCars = $scope.carsData.length;
			randomNumber = Math.floor( Math.random() * $scope.carsData.length );
		}
	
		for ( var i = 0; i < numberOfCars; i++ ) {
			tempArray.push( $scope.carsData.pop() );
		}
	
		$scope.randomCarName = tempArray[ randomNumber ].name;
		$scope.cars = tempArray;


	};

	$scope.endGame = function(){
		localStorage.setItem( 'bestScore', $scope.bestScore );

		$scope.cars = [];
        $timeout.cancel(mytimeout);
        console.log('Game end');
		$scope.progressbar.width = 0;

        gameEnd = true;
	};

	
}

function RecordsCtrl( ) {

}

function MainCtrl( ) {

}

myApp.controller('StartGameCtrl', [ '$scope', '$http', '$timeout', StartGameCtrl])
	.controller('RecordsCtrl', [ RecordsCtrl])
	.controller('MainCtrl', [ MainCtrl]);