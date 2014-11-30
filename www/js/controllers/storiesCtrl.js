'use strict';



angular.module('myApp')

.controller('StoriesCtrl', ['$scope', '$location', '$http', '$log', '$routeParams', 'RESTService', 'AuthService', 'SharedProjectSprintService','SharedStoryTaskService', 'StoryService',  function ($scope, $location, $http, $log, $routeParams, RESTService, AuthService, SharedProjectSprintService,SharedStoryTaskService,StoryService) {

  var ownerId = AuthService.getUserInfo();

  $scope.stories = [];

  var getStories = function() {

    var projectId = $routeParams.projectId;
    var sprintId  = $routeParams.sprintId;
    $scope.projectId = projectId;
    $scope.sprintId = sprintId;

    StoryService.getStoriesBySprintId(projectId,sprintId, function(data){
      $log.debug('Fetching ' + data.length + ' stories from server...');
      $scope.stories = data;
    });
  }
   getStories();


var getStorybyStoryId = function(projectId, sprintId,storyId){
  if(projectId != undefined && sprintId != undefined && storyId != undefined){

    StoryService.getStoryByStoryId(projectId, sprintId, storyId, function(data){
      $log.debug('Success getting a storybyID');
      $log.debug(data);
      $scope.story_retrieved = data;

    });
  }
}
getStorybyStoryId($routeParams.projectId, $routeParams.sprintId, $routeParams.storyId);


  $scope.createStory = function(story_title, story_description,story_notes, story_points) {

    var sprintId = $routeParams.sprintId;
    var projectId = $routeParams.projectId;


    var createFormData = {
      description: story_description,
      title: story_title,
      notes:story_notes,
      points: story_points,
      sprint_id: sprintId,
    }

    StoryService.createStory(projectId,sprintId, createFormData, function(data){
      $log.debug('Success creating new Story');
      $location.path('/projects/'+projectId+'/sprints/'+sprintId+'/stories');
    });


  }

  $scope.cancelCreateStory = function(url){
/*
    if(url == undefined ){
    $location.path('/projects/'+$routeParams.projectId+'/sprints/'+$routeParams.sprintId+'/stories');
  } else {

    $location.path(url);

  }*/

   window.history.back();
  }



  $scope.deleteStory = function(projectId,sprintId,StoryId) {
    StoryService.deleteStory(projectId, sprintId,StoryId, function(data){
      $log.debug('Success deleting story');
      getStories();
    });
  }


  $scope.updateStory = function(story_title, story_description,story_notes, story_points,id) {

    var sprintId = $routeParams.sprintId;
    var projectId = $routeParams.projectId;
    var storyId = $routeParams.storyId;


    if (sprintId != undefined && projectId != undefined  && storyId != undefined ){

      var updateFormData = {
        description: story_description,
        title: story_title,
        notes:story_notes,
        points: story_points,
        sprint_id: sprintId,
      }

      StoryService.editStory(projectId, sprintId,storyId, updateFormData, function(data){
        $log.debug('Success Updating new Story');
        $location.path(window.history.back());
      });

    }
  }


  $scope.sendEventStoryId = function(projectId,sprintId,StoryId){
    SharedStoryTaskService.prepForBroadcast(projectId,sprintId,StoryId);
  };


}

]);
