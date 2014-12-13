'use strict';

angular.module('myApp')
.controller('TasksCtrl', ['$scope', '$http', '$log', '$location', 'TaskService', 'RESTService','$routeParams','AuthService','SharedStoryTaskService', 'ProjectService', 'UserService',
function ($scope, $http, $log, $location, TaskService, RESTService,$routeParams,AuthService,SharedStoryTaskService,ProjectService, UserService) {

  $scope.tasks = [];
  $scope.task_retrieved = [];
  $scope.assigned_devs = [];
  $scope.availables = [];
  $scope.availablesNames = [];

  var projectId = $routeParams.projectId;
  var sprintId  = $routeParams.sprintId;
  var storyId = $routeParams.storyId;
  var ownerId = AuthService.getUserInfo();

  $scope.task_status_options = TaskService.getTaskStatusOptions();

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

var formattedDate = function(date) {
  var d = new Date(date || Date.now()),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [ year,month, day ].join('-');
}
  var getTasks = function(projectId, sprintId, storyId) {
    TaskService.getAllTasks(projectId, sprintId, storyId,function(data){
      $log.debug('Fetching ' + data.length + ' tasks from server...');
      $scope.tasks = data;
    });
  }

  $scope.cancelCreateTask = function(){
    $location.path( window.history.back());
  }

  $scope.createTask = function(description,nr,comment) {
    // validate
    if(comment==undefined){comment="";}
      var createFormData = {
        description: description,
        nr: nr,
        owner: ownerId,
        story_id: storyId,
        status:0,
        comment:comment
      }

      TaskService.createTask(projectId, sprintId, storyId, createFormData, function(data){
        $log.debug('Success creating new task');
        $location.path(window.history.back());
      });
    }

    var getTaskById = function(projectId, sprintId, storyId, tasktId) {
      if(tasktId != undefined && tasktId != null) {
        TaskService.getTaskById(projectId, sprintId, storyId, tasktId, function(data){
          $log.debug('Success getting a task');
          $scope.task_retrieved = data;

          $scope.task_option_selected = TaskService.getOptionByValue(data.status)
          angular.forEach(data.assigned_devs, function(value, key) {
            this.push({id:value, name:""});
          },$scope.assigned_devs);
          angular.forEach($scope.assigned_devs, function(value, key) {
            UserService.getUserById(value.id, function(data){
              value.name = data.firstname+" "+data.lastname ;
            });
          });
        });
      }
    }
    getTaskById(projectId, sprintId, storyId, $routeParams.taskId);

    var getInvitedDevelopers = function(projectId){
      ProjectService.getProjectById(projectId, function(data){
        //$scope.availables =[];
        for(var i=0;i<data.invited_devs.length;i++){
          $scope.availables.push({id:data.invited_devs[i], name:""});
        }

        for(var i=0;i<$scope.assigned_devs.length;i++){
          for(var j=0;j<$scope.availables.length;j++){
            if($scope.assigned_devs[i].id == $scope.availables[j].id){
              $scope.availables.splice(j,1);
              break;
            }
          }
        }
        angular.forEach($scope.availables, function(value, key) {
          UserService.getUserById(value.id, function(data){
            value.name = data.firstname+" "+data.lastname ;
          });
        });
      });
    }
    getInvitedDevelopers(projectId);

    $scope.assignDevelopersToTask = function(developer) {
      var payload = {
        devs: [developer.id]
      };

      $scope.assigned_devs.push(developer)
      for(var i=0;i<$scope.availables.length;i++){
        if ($scope.availables[i].id==developer.id){
          $scope.availables.splice(i,1);
          break;
        }
      }
      TaskService.assignDevelopersToTask(projectId, sprintId, storyId, $routeParams.taskId, payload, function(){
        $log.debug('Success assigned developers to task');
      });
    }
    $scope.unassignDevelopersToTask = function(developer) {
      var payload = {
        devs: [developer.id]
      };
      $scope.availables.push(developer)
      for(var i=0;i<$scope.assigned_devs.length;i++){
        if ($scope.assigned_devs[i].id==developer.id){
          $scope.assigned_devs.splice(i,1);
          break;
        }
      }
      TaskService.unassignDevelopersToTask(projectId, sprintId, storyId, $routeParams.taskId, payload, function(){
        $log.debug('Success unassigned developers to task');
      });
    }

    $scope.cancelUpdateTask = function(){
      $location.path(window.history.back());
    }


    $scope.updateTask = function(taskId, description, nr,status,comment) {
      if(comment==undefined){comment="";}
         var today = new Date();

         var updateFormData = {
          description: description,
          nr: nr,
          owner: ownerId,
          status:status,
          comment:comment,
          completion_date:formattedDate(today),
        }
        TaskService.editTask(projectId, sprintId, storyId, taskId, updateFormData, function(){
          $log.debug('Success updating a task');
          $location.path(window.history.back());
        });
      }

      $scope.deleteTask = function(projectId, sprintId, storyId, taskId) {

        TaskService.deleteTask(projectId, sprintId, storyId, taskId, function(data){
          $log.debug('Success deleting task');
          getTasks(projectId, sprintId, storyId);
        });
      }

    }
    ]);
