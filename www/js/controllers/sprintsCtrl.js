'use strict';

angular.module('myApp')
  .controller('SprintsCtrl', ['$location', '$scope', '$log', '$routeParams', 'SharedProjectSprintService', 'SprintService', function ($location, $scope, $log, $routeParams, SharedProjectSprintService, SprintService) {

      $scope.sprints = [];
      $scope.sprint_status_options = SprintService.getSprintStatusOptions();
      var projectId;


      $scope.$on('eventGetRelatedSprints', function(){
        $scope.projectId = SharedProjectSprintService.projectId;
        $scope.sprint = getSprintsByProjectId(SharedProjectSprintService.projectId);
      });


      var getSprintsByProjectId = function(projectId) {
        if (projectId != undefined){
          SprintService.getSprintsByProjectId(projectId, function(data){
            $log.debug('Success getting a sprints');
            $scope.sprints = data;
          });
        }
      }


      $scope.createSprint = function(name, start_date, end_date) {
        //TODO: 1) render sprint_status_options in form
        //      2) submit in the form
        //      3) read it in this function
        //      4) save it in createFormData
        //      5/ delete harcoded status var
        var status = 0; // this is a bug in the api/database

        var projectId = $routeParams.projectId;

        if (projectId != undefined){
          var createFormData = {
            project_id: projectId,
            name: name,
            start_date: start_date,
            end_date: end_date,
            status: parseInt(status), // bug in api
          }

          SprintService.createSprint(projectId, createFormData, function(data){
            $log.debug('Success creating new project');
            $location.path("/projects");
          });
        }
      }


      $scope.cancelCreateSprint = function(){
        $location.path("/projects");
      }


      $scope.deleteSprint = function(projectId, sprintId) {
        if(projectId != undefined && sprintId != undefined){
          SprintService.deleteSprint(projectId, sprintId, function(data){
            $log.debug('Success deleting project');
            getSprintsByProjectId(projectId);
          });

        }else{
          $log.error('Error deleting sprint: projectId and sprintId are not defined!');
        }

      }


      $scope.updateSprint = function(name, start_date, end_date, status) {
        var sprintId = $routeParams.sprintId;
        var projectId = $routeParams.projectId;

        if(sprintId != undefined && projectId != undefined){
          var updateFormData = {
            id: parseInt(projectId),
            name: name,
            start_date: start_date,
            end_date: end_date,
            status: parseInt(status),
          }

          SprintService.editSprint(projectId, sprintId, updateFormData, function(data){
            $log.debug('Success updating a sprint');
            $location.path('/projects');
          });

        }else{
          $log.error('Error updating sprint: projectId and sprintId are not defined!');
        }
      }


      $scope.cancelEditSprint = function(){
        $location.path("/projects");
      }
    }
  ]);
