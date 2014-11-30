  'use strict';

  angular.module('myApp')
  .controller('TaskboardCtrl', ['$rootScope','$scope', '$routeParams', '$http', '$log', 'ProjectService', 'AuthService','SprintService','StoryService','TaskService','SharedProjectSprintService','SharedStoryTaskService',function ($rootScope,$scope, $routeParams, $http, $log,ProjectService, AuthService,SprintService,StoryService,TaskService,SharedProjectSprintService,SharedStoryTaskService) {

    var projectId = $routeParams.projectId;
    var sprintId  = $routeParams.sprintId;
    $scope.projectId = projectId;
    $scope.sprintId = sprintId;
    $scope.stories= [];
    $scope.taskboard =[];
    var allprojects = [];
    var storiesTask = [];
    $scope.storiesTasks = [];
    $scope.task_Not_Started  = [];
    $scope.task_In_Progress  = [];
    $scope.task_Completed  = [];
    $scope.task_Blocked= [];

    var gettaskboard = function() {

      $scope.storiesTasks = [];

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
              
              TaskService.getAllTasks(projectId, sprintId, value.id,function(data){

                $log.debug('Fetching ' + data.length + ' tasks from server...');
                $scope.tasks = data;

                angular.forEach(data , function(value, key) {

                  if(value.status==0)
                    {
                      $scope.task_Not_Started.push(value);
                    }
                    else if(value.status==1)
                      {
                        $scope.task_In_Progress.push(value);

                      }
                      else if(value.status==2)
                        {
                          $scope.task_Completed.push(value);

                        }
                        else if(value.status==3)
                          {
                            $scope.task_Blocked.push(value);
                          }

                        }, log);

                        $scope.storiesTasks.push({story:value,tasks:$scope.tasks,task_Not_Started:$scope.task_Not_Started,task_In_Progress:$scope.task_In_Progress,task_Completed:$scope.task_Completed,task_Blocked:$scope.task_Blocked});
                        $scope.task_Not_Started  = [];
                        $scope.task_In_Progress  = [];
                        $scope.task_Completed  = [];
                        $scope.task_Blocked= [];
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


            $scope.deleteTask = function(projectId, sprintId, storyId,taskId) {

              TaskService.deleteTask(projectId, sprintId, storyId, taskId, function(data){
                $log.debug('Success deleting task');
                gettaskboard();
              });
            }


          }
          ]);
