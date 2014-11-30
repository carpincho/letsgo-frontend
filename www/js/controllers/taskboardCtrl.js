'use strict';

angular.module('myApp')
.controller('TaskboardCtrl', ['$rootScope','$scope', '$routeParams', '$http', '$log', 'ProjectService', 'AuthService','SprintService','StoryService','TaskService','SharedProjectSprintService','SharedStoryTaskService',function ($rootScope,$scope, $routeParams, $http, $log,ProjectService, AuthService,SprintService,StoryService,TaskService,SharedProjectSprintService,SharedStoryTaskService) {

  var projectId = $routeParams.projectId;
  var sprintId  = $routeParams.sprintId;
  $scope.projectId = projectId;
  $scope.sprintId = sprintId;
  $scope.stories= [];
  $scope.storiesTasks = [];
  $scope.taskboard =[];
  var allprojects = [];
  var storiesTask = [];
 
  var gettaskboard = function() {


    if (projectId != undefined && sprintId != undefined){

      ProjectService.getProjectById(projectId, function(data){
        $log.debug('Success getting project');
        $scope.project = data;
      });

      SprintService.getSprintBySprintId(projectId, sprintId, function(data){
        $log.debug('Success getting sprints');
        $scope.sprint = data;

        StoryService.getStoriesBySprintId(projectId,sprintId, function(data){
          $log.debug('Fetching ' + data.length + ' stories from server...');
          $scope.stories = data;

          var log = [];
          $scope.storiesTasks = [];

          angular.forEach($scope.stories, function(value, key) {
            console.log(key + 'ID historia ' + value.id);

            TaskService.getAllTasks(projectId, sprintId, value.id,function(data){

              $log.debug('Fetching ' + data.length + ' tasks from server...');
              $scope.tasks = data;

              // for each de cada task y se lo agrega a la lista respectiva

              $scope.storiesTasks.push({story:value,tasks:$scope.tasks,task_Not_Started:$scope.task_Not_Started,task_In_Progress:$scope.task_In_Progress,task_Completed:$scope.task_Completed,task_Blocked:$scope.task_Blocked});
            });
          }, log);


        });
      });




    }
  }

  gettaskboard();


  $scope.deleteStory = function(projectId,sprintId,StoryId) {
    StoryService.deleteStory(projectId, sprintId,StoryId, function(data){
      $log.debug('Success deleting story');
gettaskboard();
    });
  }


}
]);
