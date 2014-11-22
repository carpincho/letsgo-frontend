'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

/** Turn on/off the angular debugging; should be off when deployed */
app.config(['$logProvider', function($logProvider){
  $logProvider.debugEnabled(false);
}]);

/** Define the routes for the application; This routing is done by Angular */
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
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
      .when('/users/', {
        templateUrl: 'partials/user.html',
        controller: 'UsersCtrl'
      })
      .when('/project/create', {
        templateUrl: 'partials/create_project.html',
        controller: 'ProjectsCtrl'
      })
      .when('/project/edit/:projectId', {
        templateUrl: 'partials/edit_project.html',
        controller: 'ProjectsCtrl'
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
        redirectTo: '/login'
      });
    }
  ]);

app.run(function ($rootScope, $location, $http, $timeout, AuthService, RESTService) {


  $rootScope.authService = AuthService;
  $rootScope.restService = RESTService;

  $rootScope.$watch('authService.authorized()', function () {

    // if never logged in, do nothing (otherwise bookmarks fail)
    if ($rootScope.authService.initialState()) {
      // we are public browsing
      return;
    }

    // instantiate and initialize an auth notification manager
    //  $rootScope.authNotifier = new NotificationManager($rootScope);

    // when user logs in, redirect to home
    if ($rootScope.authService.authorized()) {
      $location.path("/projects");
      //  $rootScope.authNotifier.notify('information', 'Welcome ' + $rootScope.authService.currentUser() + "!");
    }

    // when user logs out, redirect to home
    if (!$rootScope.authService.authorized()) {
      $location.path("/");
      //$rootScope.authNotifier.notify('information', 'Thanks for visiting.  You have been signed out.');
    }

  }, true);


});
