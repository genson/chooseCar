'use strict';

/* Controllers */


function RecordsCtrl( ) {

}

function MainCtrl( ) {

}

myApp.controller('StartGameCtrl', [ '$scope', '$http', '$timeout',
        function( $scope, $http, $timeout){
            $scope.userScore = 0;
            $scope.bestScore = localStorage.getItem("bestScore") || 0;
            $scope.attempts = 3;
            $scope.canClickOnCar = true;
            $scope.gameEnd = false;
            $scope.timeIsUp = false;

            $scope.progressbar = {
                'status' : '',
                'width' : 0
            };

            var progressbarTimer;

            $http.get('cars/cars.json').success( function( data ) {
                //receive all cars from json and then shuffling
                $scope.carsData = shuffle( data );

                $scope.updateGame();
            });


            $scope.progressbarLength = function( timeForChoose ){
                var timeForChoose = timeForChoose || 10000,
                    value = $scope.progressbar.width,
                    type;

                $scope.progressbar.width += 5000 / timeForChoose;

                if ( value < 45 ) {
                    type = 'success';
                } else if ( value < 70 ) {
                    type = 'info';
                } else if ( value < 90 ) {
                    type = 'warning';
                } else {
                    type = 'danger';
                }

                $scope.progressbar.status = type;

                if ( $scope.progressbar.width >= 100 ) {
                    $timeout.cancel( progressbarTimer );

                    //user don't make a choice
                    $scope.attempts--;
                    $scope.canClickOnCar = false;

                    if ( $scope.attempts > 0 && !$scope.gameEnd) {

                        //show warning box
                        $scope.timeIsUp = true;

                        $timeout( function(){
                            $scope.updateGame();
                        }, 2000);

                    } else if ( $scope.attempts == 0 ) {
                        $scope.endGame();
                    }
                } else {

                    if ( !$scope.gameEnd ) {
                        //need to fix time for progressbar
                        //call itself for change length of progressbar
                  	    progressbarTimer = $timeout( $scope.progressbarLength, 50);
                    } else {
                        $timeout.cancel( progressbarTimer );
                    }
                }
            };

            $scope.checkChoice = function( carName ) {
            	//defence from double choice or clicking when time is up
                if ( !$scope.canClickOnCar ) return;

                $timeout.cancel( progressbarTimer );
            	$scope.canClickOnCar = false;

                if ( carName.name == $scope.randomCarName ) {
                    carName.flag = "choice-success";

                    //add points depending on the speed of an answer
                    var score = Math.floor( 100 - $scope.progressbar.width );

                    $timeout(function() {
                    	$scope.updateGame(score);
                    	}, 1500);

                } else {
                	carName.flag = "choice-fail";
                    $scope.attempts--;

                    $timeout(function() {
                    	$scope.updateGame();
                    	}, 1500);
                }
            };

            $scope.updateGame = function( /* optional */ score, /* optional */ numberOfCars ) {
                var tempArray = [],
                    score = score || 0,
                    numberOfCars = numberOfCars || 4,
                    randomNumber = Math.floor( Math.random() * numberOfCars );

                //add score
                $scope.userScore += score;

                $scope.timeIsUp = false;
                $scope.progressbar.width = 0;

                //we can make a one choice
                $scope.canClickOnCar = true;

                if ( $scope.gameEnd || !$scope.attempts || !$scope.carsData.length ) {
                    $scope.endGame();
                    return;
                } else {
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
                //check for new bestScore and save to localStorage
                $scope.bestScore = ( $scope.userScore > $scope.bestScore ) ? $scope.userScore : $scope.bestScore;
                localStorage.setItem( 'bestScore', $scope.bestScore );

                //clear blocks with cars
                $scope.cars = [];

                // show/hide blocks when game over
                $scope.gameEnd = true;
            };

        }
    ])
	.controller('RecordsCtrl', [ RecordsCtrl])
	.controller('MainCtrl', [ MainCtrl]);

function shuffle( array ) {
    var i = array.length,
        j,
        temp;

    while ( --i ) {
        j = Math.floor( Math.random() * (i + 1) );
        temp = array[ i ];
        array[ i ] = array[ j ];
        array[ j ] = temp;
    }

    return array;
}