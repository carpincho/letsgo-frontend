'use strict';

angular.module('myApp')
  .controller('TasksCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location', 'ProjectService', 'TaskService', 'RESTService', 'AuthService',
    function ($scope, $http, $log, $routeParams, $rootScope, $location, ProjectService, TaskService, RESTService, AuthService) {

      $scope.currentStoryId = TaskService.getCurrentStoryId();
      $scope.CurrentStoryPath = TaskService.getCurrentStoryPath();
      $scope.tasks = [];
      //$scope.allAvailables = [];
      $rootScope.assigned_devs = [];
      $rootScope.availables = [];
      //$scope.availablesNames = [];
      //$scope.assigned_devs_names = [];
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
            for(var i=0;i<data.assigned_devs.length;i++){
              $rootScope.assigned_devs.push({id:data.assigned_devs[i], name:""});
              AuthService.getUserById($rootScope.assigned_devs[i].id, function(data){
                $rootScope.assigned_devs[i].name = data.firstname+" "+data.lastname;
              });
            }


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
          for(var i=0;i<data.invited_devs.length;i++){
            $rootScope.availables.push({id:data.invited_devs[i], name:""});
            console.log($rootScope.availables);
            AuthService.getUserById($rootScope.availables[i].id, function(data){
              $rootScope.availables[i].name = data.firstname+" "+data.lastname;
            });
          }
          for(var i=0;i<$rootScope.assigned_devs.length;i++){
            for(var j=0;j<$rootScope.availables.length;j++){
              if($rootScope.assigned_devs[i].id == $rootScope.availables[j].id){
                $rootScope.availables.splice(j,1);
                break;
              }
            }
          }
          console.log($rootScope.availables);
        });
      }
      getInvitedDevelopers($routeParams.projectId);

      $scope.assignDevelopersToTask = function(developers) {
        // var payload = developers;
        var payload = {
          devs: [developers]
        };
        $rootScope.assigned_devs.push($rootScope.availables[developers])
        for(var i=0;i<$rootScope.availables.length;i++){
          if ($rootScope.availables[i].id==developers){
            $rootScope.availables.splice(i,1);
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
        $rootScope.availables.push($rootScope.assigned_devs[developers])
        for(var i=0;i<$rootScope.assigned_devs.length;i++){
          if ($rootScope.assigned_devs[i].id==developers){
            $rootScope.assigned_devs[i].splice(i,1);
            break;
          }
        }
        TaskService.unassignDevelopersToTask($routeParams.taskId, payload, function(){
          $log.debug('Success unassigned developers to task');
        });
      }
    }
  ]);
