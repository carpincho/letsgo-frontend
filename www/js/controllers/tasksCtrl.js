'use strict';

angular.module('myApp')
.controller('TasksCtrl', ['$scope', '$rootScope', '$http', '$log', '$location', 'TaskService', 'RESTService','$routeParams','AuthService','SharedStoryTaskService', 'ProjectService',
function ($scope, $rootScope, $http, $log, $location, TaskService, RESTService,$routeParams,AuthService,SharedStoryTaskService,ProjectService) {

  $scope.tasks = [];
  $rootScope.assigned_devs = [];
  $rootScope.availables = [];
  $scope.task_retrieved = [];

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
    var createFormData = {
      description: description,
      nr: nr,
      owner: ownerId,
      story_id: storyId,
      status:0,
      comment:"",
    }

    TaskService.createTask(projectId, sprintId, storyId,createFormData, function(data){
      $log.debug('Success creating new task');
      $location.path(window.history.back());
    });
  }



  var getTaskById = function(projectId, sprintId, storyId, tasktId) {
    if(tasktId != undefined && tasktId != null) {
      TaskService.getTaskById(projectId, sprintId, storyId, tasktId, function(data){
        $log.debug('Success getting a task');
        $scope.task_retrieved = data;
        $rootScope.assigned_devs = [];


        for(var k=0;k<data.assigned_devs.length;k++){

           $rootScope.assigned_devs.push({id:data.assigned_devs[k], name:""});

          //AuthService.getUserById($rootScope.assigned_devs[k].id, function(data){
          //  $scope.assigned_devs_name.push({id:data[i], name:data.firstname+" "+data.lastname});
          //  var s = k-1;
          //  $rootScope.assigned_devs[s].name = data.firstname+" "+data.lastname;
          //});
        }






      });
    }
  } // get project from url

 getTaskById(projectId, sprintId, storyId, $routeParams.taskId);

      var getInvitedDevelopers = function(projectId){

        ProjectService.getProjectById(projectId, function(data){
          $rootScope.availables =[];
          for(var i=0;i<data.invited_devs.length;i++){
            $rootScope.availables.push({id:data.invited_devs[i], name:""});
            //AuthService.getUserById($rootScope.availables[i].id, function(data){
            //  var u = i-1;
            //  $rootScope.availables[u].name = data.firstname+" "+data.lastname;
            //});
          }
          for(var i=0;i<$rootScope.assigned_devs.length;i++){
            for(var j=0;j<$rootScope.availables.length;j++){
              if($rootScope.assigned_devs[i].id == $rootScope.availables[j].id){
                $rootScope.availables.splice(j,1);
                break;
              }
            }
          }
        });
      }

      getInvitedDevelopers(projectId);

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
        TaskService.assignDevelopersToTask(projectId, sprintId, storyId, $routeParams.taskId, payload, function(){
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
            $rootScope.assigned_devs.splice(i,1);
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

    var updateFormData = {
      description: description,
      nr: nr,
      owner: ownerId,
      status:status,
      comment:comment,
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
