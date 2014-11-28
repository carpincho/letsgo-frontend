'use strict';



angular.module('myApp')
.controller('StoriesCtrl', ['$scope', '$location', '$http', '$log', '$routeParams', 'RESTService', 'AuthService', 'SharedProjectSprintService',  function ($scope, $location, $http, $log, $routeParams, RESTService, AuthService, SharedProjectSprintService) {


  var ownerId = AuthService.getUserInfo();
  $scope.stories = [];

  var getStories = function() {

    var projectID = $routeParams.projectID;
    var sprintID = $routeParams.sprintID;
    $scope.projectId = projectID;
    $scope.sprintId = sprintID;

    var get_all_stories_uri = '/projects/'+projectID+'/sprints/'+sprintID+'/stories';

    RESTService.get(get_all_stories_uri, function(data){
      $log.debug('Fetching ' + data.length + ' stories from server...');
      $scope.stories = data;
    });
  }
  // fetch the existing stories in the server
  getStories();


  $scope.createStory = function(story_title, story_description,story_notes, story_points) {

    var sprintID = $routeParams.sprintID;
    var projectID = $routeParams.projectID;


    if (sprintID != undefined && projectID != undefined ){
      var create_story_uri = '/projects/'+ projectID + '/sprints/'+sprintID+'/stories';


      var createFormData = {
        description: story_description,
        title: story_title,
        notes:story_notes,
        points: story_points,
        sprint_id: sprintID,
      }

      RESTService.post(create_story_uri, createFormData, function(data){
        $log.debug('Success creating new Story');
        $location.path('/projects/'+$routeParams.projectID+'/sprints/'+$routeParams.sprintID+'/stories');
      });

    }
  }

  $scope.cancelCreateStory = function(){
    $location.path('/projects/'+$routeParams.projectID+'/sprints/'+$routeParams.sprintID+'/stories');
  }



  $scope.deleteStory = function(projectID,sprintID,StoryId) {
    var delete_story_uri = '/projects/'+ projectID + '/sprints/'+sprintID+'/stories/'+StoryId;
    RESTService.delete(delete_story_uri, function(data){
      $log.debug('Success deleting story');
      getStories();
    });
  }


  $scope.updateStory = function(story_title, story_description,story_notes, story_points,id) {

    var sprintID = $routeParams.sprintID;
    var projectID = $routeParams.projectID;
    var storyID = $routeParams.storyID;


    if (sprintID != undefined && projectID != undefined  && storyID != undefined ){
      var create_story_uri = '/projects/'+ projectID + '/sprints/'+sprintID+'/stories/'+storyID;

      var createFormData = {
        description: story_description,
        title: story_title,
        notes:story_notes,
        points: story_points,
        sprint_id: sprintID,
      }

      RESTService.put(create_story_uri, createFormData, function(data){
        $log.debug('Success Updating new Story');
        $location.path('/projects/'+$routeParams.projectID+'/sprints/'+$routeParams.sprintID+'/stories');
      });

    }
  }




}

]);
