'use strict';

angular.module('myApp')
.controller('TasksCtrl', ['$scope', '$http', '$log', '$location', 'TaskService', 'RESTService','$routeParams','AuthService','SharedStoryTaskService',
function ($scope, $http, $log, $location, TaskService, RESTService,$routeParams,AuthService,SharedStoryTaskService) {

  $scope.tasks = [];


  var projectId = $routeParams.projectId;
  var sprintId  = $routeParams.sprintId;
  var storyId = $routeParams.storyId;
  var ownerId = AuthService.getUserInfo();

  $scope.$on('eventGetRelatedStory', function(){
    $scope.projectId = SharedStoryTaskService.projectId;
    $scope.sprintId = SharedStoryTaskService.sprintId;
    $scope.storyId =  SharedStoryTaskService.storyId;

    var projectId = $scope.projectId;
    var sprintId  = $scope.sprintId;
    var storyId = $scope.storyId;
    var ownerId = AuthService.getUserInfo();

    if($scope.projectId != undefined){
      getTasks(projectId, sprintId, storyId);
    }

  });


  var getTasks = function(projectId, sprintId, storyId) {
    TaskService.getAllTasks(projectId, sprintId, storyId,function(data){
      $log.debug('Fetching ' + data.length + ' tasks from server...');
      $scope.tasks = data;
    });
  }


  $scope.cancelCreateTask = function(){
    $location.path( window.history.back());
  }

  $scope.createTask = function(description,nr) {
    // validate
    var story_id = storyId;
    var createFormData = {
      description: description,
      nr: nr,
      owner: ownerId,
      story_id: story_id,
      status:0,
      comment:"",
    }

    TaskService.createTask(projectId, sprintId, storyId,createFormData, function(data){
      $log.debug('Success creating new task');
      $location.path(window.history.back());
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
  //  getTaskById($routeParams.taskId);


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
