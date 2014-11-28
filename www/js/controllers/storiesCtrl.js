'use strict';



angular.module('myApp')
.controller('StoriesCtrl', ['$scope', '$location', '$http', '$log', '$routeParams', 'RESTService', 'AuthService', 'SharedProjectSprintService',  function ($scope, $location, $http, $log, $routeParams, RESTService, AuthService, SharedProjectSprintService) {


  var ownerId = AuthService.getUserInfo();
  $scope.stories = [];

  var getStories = function() {

    var projectID = $routeParams.projectID;
    var sprintID = $routeParams.sprintID;

    var get_all_stories_uri = '/projects/'+projectID+'/sprints/'+sprintID+'/stories';

    RESTService.get(get_all_stories_uri, function(data){
      $log.debug('Fetching ' + data.length + ' stories from server...');
      $scope.stories = data;
    });
  }
  // fetch the existing stories in the server
  getStories();


}

]);
