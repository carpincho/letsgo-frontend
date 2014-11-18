'use strict';

var app = angular.module('Demo', [
  'ngRoute'
]);

/** Turn on/off the angular debugging; should be off when deployed */
app.config(['$logProvider', function($logProvider){
  $logProvider.debugEnabled(false);
}]);

/** Define the routes for the application; This routing is done by Angular */
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/todos', {
        templateUrl: 'partials/todos.html',
        controller: 'TodosCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'SessionCtrl'
      })
      .when('/logout', {
        templateUrl: 'partials/logout.html',
        controller: 'SessionCtrl'
      })
      .otherwise({
        redirectTo: '/todos'
      });
    }
  ]);
