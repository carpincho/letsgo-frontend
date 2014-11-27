'use strict';

angular.module('myApp')
  .controller('TasksCtrl', ['$scope', '$http', '$log', '$routeParams', '$location', 'TaskService', 'RESTService',
    function ($scope, $http, $log, $routeParams, $location, TaskService, RESTService) {

      $scope.currentStoryID = TaskService.getCurrentStoryID();
      $scope.currentStory = TaskService.getCurrentStory();
      $scope.tasks = [];


      var getTasks = function() {
        var get_all_tasks_uri = TaskService.getTaskPath();

        RESTService.get(get_all_tasks_uri, function(data){
          $log.debug('Fetching ' + data.length + ' projects from server...');
          $scope.tasks = data;
        });
      }

      // fetch the existing projects in the server
      getTasks();

      $scope.cancelCreateTask = function(){
        $location.path(TaskService.getTaskPath());
      }

      TaskService.getAllTasks();

      $scope.createTask = function(description,nr) {
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

        payload = createFormData;

        RESTService.post(create_task_uri, payload, function(data){
          $log.debug('Success creating new task');
          $location.path(TaskService.getTaskPath());
        });
      }

      var getTask = function(taskId) {
        var get_task_uri = TaskService.getTaskPath() +"/" + taskId;
        var fetchedTask = {};
        if(typeof(taskId) == 'undefined' || taskId == null) {
          return fetchedTask;
        }


        RESTService.get(get_task_uri, function(data){
          $log.debug('Success getting a task');
          fetchedTask = data;
          $scope.task_retrieved = data;
          //$scope.option_selected = getOptionByValue($scope.project_status_options, data.status)
        });
      }
      // get project from url
      getTask($routeParams.taskId);


      $scope.cancelUpdateTask = function(){
        $location.path(TaskService.getTaskPath());
      }

      $scope.updateTask = function(taskId, description, nr) {

        var update_task_uri = TaskService.getTaskPath() +"/" + taskId;

        var ownerId = 1; //get owner
        var payload;

        var updateFormData = {
          description: description,
          nr: nr,
          owner: ownerId
        }

        payload = updateFormData;

        RESTService.put(update_task_uri, payload, function(data){
          $log.debug('Success updating a task');
          $location.path(TaskService.getTaskPath());
        });
      }
      $scope.deleteTask = function(taskId) {
        // put in a service
        var delete_project_uri = TaskService.getTaskPath() +"/" + taskId;

        $log.debug('Deleting task ' + taskId +'from ' + TaskService.getTaskPath());

        RESTService.delete(delete_project_uri, function(data){
          $log.debug('Success deleting task');
          getTasks();
        });
      }

      $scope.cancelCreateTasks = function(){
        $location.path(TaskService.getTaskPath());
      }


    }
  ]);
