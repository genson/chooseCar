'use strict';

/* Controllers */
function StartGameCtrl( $scope, $http ){
	$http.get('cars/cars.json').success( function( data ) {
		var randomNumber = Math.floor( Math.random() * 4 ); //from 0 to 3
		$scope.randomCarName = data[ randomNumber ].name;
		$scope.cars = data;
	});

	$scope.checkChoice = function( car ) {
		if ( car.name == $scope.randomCarName ) {
			alert('Rigth!')
		} else {
			alert('wrong!');
		}
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