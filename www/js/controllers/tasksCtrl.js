'use strict';

angular.module('myApp')
  .controller('TasksCtrl', ['$scope', '$http', '$log', '$routeParams', '$location', 'TaskService', 'RESTService',
    function ($scope, $http, $log, $routeParams, $location, TaskService, RESTService) {

      $scope.currentStoryID = TaskService.getCurrentStoryID();
      $scope.currentStory = TaskService.getCurrentStory();

      $scope.tasks = [];
      $scope.tasks = TaskService.getAllTasks($routeParams.projectId,$routeParams.sprintID,$routeParams.sprintID);

      TaskService.getAllTasks();

      $scope.createTask = function(description,nr) {
        // put in a service
        var create_task_uri = TaskService.getTaskPath();
        var payload = {};

        // validate
        var ownerId = 1; //get owner
        var story_id = $scope.currentStoryID;
        var createFormData = {
          description: description,
          nr: nr,
          owner: ownerId,
          story_id: story_id
        }

        payload = createFormData

        RESTService.post(create_task_uri, payload, function(data){
          $log.debug('Success creating new task');
          $location.path(TaskService.getTaskPath());
        });

      }


      $scope.cancelCreateTasks = function(){
        // put in a service
        $location.path(TaskService.getTaskPath());
      }
  

    }
  ]);
