'use strict';

var app = angular.module('myApp', [
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
      //.when('/todos', {
      //  templateUrl: 'partials/todos.html',
      //  controller: 'TodosCtrl'
      //})
      .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'SessionCtrl'
      })
      .when('/logout', {
        templateUrl: 'partials/logout.html',
        controller: 'SessionCtrl'
      })
      .when('/projects', {
        templateUrl: 'partials/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/requirements', {
        templateUrl: 'partials/requirements.html',
        controller: 'RequirementsCtrl'
      })
      .when('/sprints', {
        templateUrl: 'partials/sprints.html',
        controller: 'SprintsCtrl'
      })
      .when('/tasks', {
        templateUrl: 'partials/tasks.html',
        controller: 'TasksCtrl'
      })
      .otherwise({
        redirectTo: '/todos'
      });
    }
  ]);
