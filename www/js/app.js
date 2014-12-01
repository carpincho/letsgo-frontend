'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

app.config(['$logProvider', function($logProvider){
  $logProvider.debugEnabled(true);
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

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

  .when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'UserCtrl'
  })

  .when('/user/password/', {
    templateUrl: 'partials/change_password.html',
    controller: 'UserCtrl'
  })

  .when('/user/edit/:userId', {
    templateUrl: 'partials/edit_user.html',
    controller: 'UserCtrl'
  })

  .when('/user', {
    templateUrl: 'partials/user.html',
    controller: 'UserCtrl'
  })

  .when('/project/edit/:projectId', {
    templateUrl: 'partials/edit_project.html',
    controller: 'ProjectsCtrl'
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

  .when('/projects/:projectId/sprints/:sprintId/stories/', {
    templateUrl: 'partials/stories.html',
    controller: 'StoriesCtrl'
  })

  .when('/projects/:projectId/sprints/:sprintId/stories/create', {
    templateUrl: 'partials/create_story.html',
    controller: 'StoriesCtrl'
  })
  .when('/projects/:projectId/sprints/:sprintId/stories/edit/:storyId', {
    templateUrl: 'partials/edit_story.html',
    controller: 'StoriesCtrl'
  })

  .when('/projects/share/:projectId/', {
    templateUrl: 'partials/share_project.html',
    controller: 'ProjectCtrl'
  })

  .when('/sprints', {
    templateUrl: 'partials/sprints.html',
    controller: 'SprintsCtrl'
  })

  .when('/sprint/create/:projectId', {
    templateUrl: 'partials/create_sprint.html',
    controller: 'SprintsCtrl'
  })

  .when('/projects/:projectId/sprints/edit/:sprintId', {
    templateUrl: 'partials/edit_sprint.html',
    controller: 'SprintsCtrl'
  })

  .when('/tasks', {
    templateUrl: 'partials/tasks.html',
    controller: 'TasksCtrl'
  })

  .when('/projects/:projectId/sprints/:sprintId/stories/:storyId/tasks',{
    templateUrl: 'partials/tasks.html',
    controller: 'TasksCtrl'
  })

  .when('/projects/:projectId/sprints/:sprintId/stories/:storyId/tasks/create',{
    templateUrl: 'partials/create_task.html',
    controller: 'TasksCtrl'
  })

  .when('/projects/:projectId/sprints/:sprintId/stories/:storyId/task/edit/:taskId', {
    templateUrl: 'partials/edit_task.html',
    controller: 'TasksCtrl'
  })

  .when('/taskboard/project/:projectId/sprint/:sprintId', {
    templateUrl: 'partials/taskboard.html',
    controller: 'TaskboardCtrl'
  })


  .otherwise({
    redirectTo: '/login'
  });
}
]);


app.run(function ($rootScope, $location, $http, $timeout, AuthService, RESTService, $cookieStore) {

  $rootScope.authService = AuthService;
  $rootScope.restService = RESTService;

  $rootScope.$watch('authService.authorized()', function(){

    var cookie_lets_go_session_client = $cookieStore.get('lets_go_session_client');
    var cookie_lets_go_user_info = $cookieStore.get('lets_go_user_info');
    $rootScope.authService.setLoggedIn(cookie_lets_go_session_client,cookie_lets_go_user_info);

    var baseUsersUri = '/users'
    var userId = cookie_lets_go_user_info;
    var getUserUri = baseUsersUri + '/' + userId;


    //validate when is not defined userID
    var getUser = function(){
      RESTService.get(getUserUri, function(data){
        $rootScope.userInfo = data;
        //$log.debug(data);
      });
    }

    if(userId != undefined){
      // the user is not logged yet
      getUser();
    }

    // if never logged in, do nothing (otherwise bookmarks fail)
    if ($rootScope.authService.initialState()){
      // we are public browsing
      return;
    }

    // when user logs in, redirect to home
    if ($rootScope.authService.authorized()){
      $location.path("/projects");
    }

    // when user logs out, redirect to home
    if (!$rootScope.authService.authorized()){
      $location.path("/");
    }

  }, true);


});
