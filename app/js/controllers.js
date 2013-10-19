'use strict';

/* Controllers */
function StartGameCtrl( $scope, $http, $timeout, $location ){
	$scope.userScore = 0;
	$scope.bestScore = localStorage.getItem("bestScore") || 0;
	$scope.attempts = 3;

	$scope.gameEnd = false;

	$scope.progressbar = {
		'status' : '',
		'width' : 0
	};

	$http.get('cars/cars.json').success( function( data ) {
		//all cars from json
		$scope.carsData = data;
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
     	} else if ( value < 95 ) {
     		type = 'warning';
     	} else {
     		type = 'danger';
     	}

     	$scope.progressbar.status = type;

        if ( $scope.progressbar.width >= 100 ) {
      		//user don't make a choice
         	$scope.attempts--;

         	if ( $scope.attempts > 0 && !$scope.gameEnd) {
				alert('Fail! ' + $scope.attempts + ' attemps left!');
				$timeout.cancel(progressbarTimer);
         		$scope.updateGame();

         	} else if ( $scope.attempts == 0 ) {
                $scope.endGame();
                  
            } //else {
                // 	console.log('WTF!');
                //     $scope.endGame();
                //     $timeout.cancel(progressbarTimer);
                   
                // }
        }

        if ( !$scope.gameEnd ) {
        	//need to fix time for progressbar
        	//call itself for shange length of progressbar
            progressbarTimer = $timeout( $scope.progressbarLength, 100);
        } else {
            $timeout.cancel(progressbarTimer);
        }
	};

	//first start for timer
    var progressbarTimer = $timeout( $scope.progressbarLength, 1);

	$scope.checkChoice = function( carName ) {
		if ( carName == $scope.randomCarName ) {
			alert('Rigth!');
            $timeout.cancel(progressbarTimer);
			$scope.updateGame( 50 );

		} else {
			$scope.attempts--;
			alert('Fail!');
            $timeout.cancel(progressbarTimer);
			$scope.updateGame();
		}
	};
	
	$scope.updateGame = function( /* optional */ score, /* optional */ numberOfCars ) {
		var tempArray = [],
			score = score || 0,
			numberOfCars = numberOfCars || 4,
			randomNumber = Math.floor( Math.random() * numberOfCars );
	
		//add score
		$scope.userScore += score;

        $scope.progressbar.width = 0;

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
        
        //for hidden block 
        $scope.gameEnd = true;
	};
	
}

function RecordsCtrl( ) {

}

function MainCtrl( ) {

}

myApp.controller('StartGameCtrl', [ '$scope', '$http', '$timeout', StartGameCtrl])
	.controller('RecordsCtrl', [ RecordsCtrl])
	.controller('MainCtrl', [ MainCtrl]);