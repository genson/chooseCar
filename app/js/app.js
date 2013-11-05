'use strict';

var myApp = angular.module('chooseCar', ['ngRoute', 'ngTouch'])
	.config(['$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {
        $locationProvider.html5Mode(false);
		$routeProvider.when('/game', { templateUrl: 'partials/startGame.html', controller: 'StartGameCtrl'});
		$routeProvider.when('/records', { templateUrl: 'partials/records.html', controller: 'RecordsCtrl'});
		$routeProvider.when('/main', { templateUrl: 'partials/main.html', controller: 'MainCtrl'});
		$routeProvider.otherwise({ redirectTo: '/main'});
	}]);