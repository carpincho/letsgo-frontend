'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'tc.chartjs']);

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

  .when('/project/project_members/:projectId', {
    templateUrl: 'partials/project_members.html',
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

  .when('/project/share/:projectId', {
    templateUrl: 'partials/share_project.html',
    controller: 'ProjectsCtrl'
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

  .when('/burndownchart/project/:projectId/sprint/:sprintId', {
    templateUrl: 'partials/burndownChart.html',
    controller: 'BurndownChartCtrl'
  })

  .otherwise({
    redirectTo: '/login'
  });
}
]);


app.run(function ($rootScope, $location, $http, $timeout, AuthService, RESTService, $cookieStore, UserService) {

  $rootScope.authService = AuthService;
  $rootScope.restService = RESTService;

  $rootScope.$watch('AuthService.authorized()', function(){

    var cookie_lets_go_session_client = $cookieStore.get('lets_go_session_client');
    var cookie_lets_go_user_info = $cookieStore.get('lets_go_user_info');

  if(!angular.isUndefined(cookie_lets_go_session_client)  && !angular.isUndefined(cookie_lets_go_user_info) ){
    AuthService.setLoggedIn(cookie_lets_go_session_client, cookie_lets_go_user_info);
  }
    var userId = cookie_lets_go_user_info;

    var getUser = function(){
      UserService.getUserById (userId, function(data){
      AuthService.setUserInfo(data.id);
      });
    }

    if(!angular.isUndefined(userId)){
      // the user is not logged yet
      getUser();
    }

    // when user logs in, redirect to home
    if (AuthService.authorized()){
      $location.path("/projects");
    }

    // when user logs out, redirect to home
    if (!AuthService.authorized()){
      $location.path("/login");
    }

    // if never logged in, do nothing (otherwise bookmarks fail)
    if (AuthService.initialState()){
      // we are public browsing
      return;
    }

  }, true);
});
