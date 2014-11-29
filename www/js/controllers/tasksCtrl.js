'use strict';

angular.module('myApp')
  .controller('TasksCtrl', ['$scope', '$http', '$log', '$routeParams', '$location', 'ProjectService', 'TaskService', 'RESTService',
    function ($scope, $http, $log, $routeParams, $location, ProjectService, TaskService, RESTService) {

      $scope.currentStoryId = TaskService.getCurrentStoryId();
      $scope.CurrentStoryPath = TaskService.getCurrentStoryPath();
      $scope.tasks = [];
      $scope.allAvailables = [];
      $scope.assigned_devs = [];
      $scope.availables = [];
      var getTasks = function() {
        TaskService.getAllTasks(function(data){
          $log.debug('Fetching ' + data.length + ' tasks from server...');
          $scope.tasks = data;

        });
      }
      getTasks();

      $scope.cancelCreateTask = function(){
        $location.path(TaskService.getTaskPath());
      }

      $scope.createTask = function(description,nr) {
        // valIdate
        var ownerId = 1; //get owner
        var story_Id = $scope.currentStoryId;
        var createFormData = {
          description: description,
          nr: nr,
          owner: ownerId,
          story_Id: story_Id
        }
        TaskService.createTask(createFormData, function(data){
          $log.debug('Success creating new task');
          $location.path(TaskService.getTaskPath());
        });
      }

      var getTaskById = function(tasktId) {
        if(tasktId != undefined && tasktId != null) {

          TaskService.getTaskById(tasktId, function(data){
            $log.debug('Success getting a task');
            $scope.task_retrieved = data;
            $scope.assigned_devs = data.assigned_devs;
            $log.debug(data);
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
        var ownerId = 1; //get owner

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

      var getInvitedDevelopers = function(projectId){
        ProjectService.getProjectById(projectId, function(data){
          $scope.availables = data.invited_devs;
          for(var i=0;i<$scope.assigned_devs.length;i++){
            for(var j=0;j<i<$scope.availables.length;i++){
              if($scope.assigned_devs[i] == $scope.availables[j]){
                $scope.availables.splice(j,1);
                break;
              }
            }
          }
        });



      }
      getInvitedDevelopers($routeParams.projectId);




      $scope.assignDevelopersToTask = function(developers) {
        // var payload = developers;
        var payload = {
          devs: [developers]
        };
        $scope.assigned_devs.push(developers)
        for(var i=0;i<$scope.availables.length;i++){
          if ($scope.availables[i]==developers){
            $scope.availables.splice(i,1);
            break;
          }
        }
        TaskService.assignDevelopersToTask($routeParams.taskId, payload, function(){
          $log.debug('Success assigned developers to task');
        });
      }

      $scope.unassignDevelopersToTask = function(developers) {
        // var payload = developers;
        var payload = {
          devs: [developers]
        };
        $scope.availables.push(developers)
        for(var i=0;i<$scope.assigned_devs.length;i++){
          if ($scope.assigned_devs[i]==developers){
            $scope.assigned_devs.splice(i,1);
            break;
          }
        }
        TaskService.unassignDevelopersToTask($routeParams.taskId, payload, function(){
          $log.debug('Success unassigned developers to task');
        });
      }
    }
  ]);
