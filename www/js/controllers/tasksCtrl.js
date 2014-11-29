'use strict';

angular.module('myApp')
.controller('TasksCtrl', ['$scope', '$http', '$log', '$location', 'TaskService', 'RESTService','$routeParams','AuthService',
function ($scope, $http, $log, $location, TaskService, RESTService,$routeParams,AuthService) {

  $scope.tasks = [];


  var projectId = $routeParams.projectId;
  var sprintId  = $routeParams.sprintId;
  var storyId = $routeParams.storyId;
  var ownerId = AuthService.getUserInfo();

  $scope.projectId = projectId;
  $scope.sprintId = sprintId;
  $scope.storyId =  storyId;

  var getTasks = function() {
    TaskService.getAllTasks(projectId, sprintId, storyId,function(data){
      $log.debug('Fetching ' + data.length + ' tasks from server...');
      $scope.tasks = data;
    });
  }
  getTasks();

  $scope.cancelCreateTask = function(){
    $location.path(TaskService.getTaskPath());
  }

  $scope.createTask = function(description,nr) {
    // validate
    var story_id = storyId;
    var createFormData = {
      description: description,
      nr: nr,
      owner: ownerId,
      story_id: story_id
    }

    TaskService.createTask(projectId, sprintId, storyId,createFormData, function(data){
      $log.debug('Success creating new task');
      $location.path(TaskService.getTaskPath(projectId, sprintId, storyId));
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

  var getTaskById = function(tasktId) {
    if(tasktId != undefined && tasktId != null) {

      TaskService.getTaskById(tasktId, function(data){
        $log.debug('Success getting a task');
        $scope.task_retrieved = data;
        //$scope.project_option_selected = ProjectService.getOptionByValue(data.status)
      });
    }
  }
  // get project from url
  getTaskById($routeParams.taskId);


  $scope.cancelUpdateTask = function(){
    $location.path(TaskService.getTaskPath());
  }

  $scope.updateTask = function(taskId, description, nr) {

    var updateFormData = {
      description: description,
      nr: nr,
      owner: ownerId
    }
    TaskService.editTask(taskId, updateFormData, function(){
      $log.debug('Success updating a task');
      $location.path(TaskService.getTaskPath());
    });
  }

  $scope.deleteTask = function(taskId) {
    TaskService.deleteTask(taskId, function(data){
      $log.debug('Success deleting task');
      getTasks();
    });
  }

  $scope.cancelCreateTasks = function(){
    $location.path(TaskService.getTaskPath());
  }


}
]);
