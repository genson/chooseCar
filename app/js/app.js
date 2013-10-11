'use strict';

var myApp = angular.module('chooseCar', ['ngRoute', 'ngTouch'])
	.config(['$routeProvider', function( $routeProvider ) {
		$routeProvider.when('/game', { templateUrl: 'partials/startGame.html', controller: 'StartGameCtrl'});
		$routeProvider.when('/records', { templateUrl: 'partials/records.html', controller: 'RecordsCtrl'});
		$routeProvider.when('/about', { templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
		$routeProvider.when('/main', { templateUrl: 'partials/main.html', controller: 'MainCtrl'});
		$routeProvider.otherwise({ redirectTo: '/main'});
	}]);