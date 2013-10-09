'use strict';


// Declare app level module which depends on filters, and services
// angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
//   config(['$routeProvider', function($routeProvider) {
//     $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
//     $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
//     $routeProvider.otherwise({redirectTo: '/view1'});
//   }]);

var myApp = angular.module('chooseCar', ['ngRoute', 'ngTouch'])
	.config(['$routeProvider', function( $routeProvider ) {
		$routeProvider.when('/game', { templateUrl: 'partials/startGame.html', controller: 'StartGameCtrl'});
		$routeProvider.when('/records', { templateUrl: 'partials/records.html', controller: 'RecordsCtrl'});
		$routeProvider.when('/about', { templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
		$routeProvider.when('/main', { templateUrl: 'partials/main.html', controller: 'MainCtrl'});
		$routeProvider.otherwise({ redirectTo: '/main'});
	}]);