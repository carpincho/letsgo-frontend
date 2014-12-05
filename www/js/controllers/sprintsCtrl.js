'use strict';

angular.module('myApp')
  .controller('SprintsCtrl', ['$location', '$scope', '$log', '$routeParams', 'SharedProjectSprintService', 'SprintService', 'ProjectService', function ($location, $scope, $log, $routeParams, SharedProjectSprintService, SprintService, ProjectService) {

    $scope.sprints = [];
    $scope.sprint_status_options = SprintService.getSprintStatusOptions();
    var projectId;

    //---datepicker config
    $scope.open_start_date  = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.start_date_opened = true;
    };

    $scope.open_end_date = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.end_date_opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
    $scope.format = $scope.formats[1];
    //---end config

    $scope.$on('eventGetRelatedSprints', function(){
      $scope.projectId = SharedProjectSprintService.projectId;
      if($scope.projectId != undefined){
        $scope.sprint = getSprintsByProjectId(SharedProjectSprintService.projectId);
      }

    });

    var getSprintsByProjectId = function(projectId){
      if (projectId != undefined){
        SprintService.getSprintsByProjectId(projectId, function(data){
          $log.debug('Success getting a sprints');
          $scope.sprints = data;
        });
      }else{
        $scope.sprints = {};
      }
    }

    var getSprintBySprintId = function(projectId, sprintId){
      if(projectId != undefined && sprintId != undefined){

        SprintService.getSprintBySprintId(projectId, sprintId, function(data){
          $log.debug('Success getting a sprint');
          $scope.sprint_retrieved = data;
          $scope.sprint_option_selected = SprintService.getOptionByValue(data.status)
        });
      }
    }
    getSprintBySprintId($routeParams.projectId, $routeParams.sprintId);

    $scope.createSprint = function(name, start_date, end_date){
      var projectId = $routeParams.projectId;

      if (projectId != undefined){
        var createFormData = {
          project_id: parseInt(projectId),
          name: name,
          start_date: start_date,
          end_date: end_date,
          status: 0,
        }

        SprintService.createSprint(projectId, createFormData, function(data){
          $log.debug('Success creating new project');
          $location.path("/projects");
        });
      }
    }


    $scope.cancelCreateSprint = function(){
      $location.path(window.history.back());
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

    $scope.updateSprint = function(name, start_date, end_date, status){
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

    $scope.cancelUpdateSprint = function(){
      $location.path(window.history.back());
    }

    var getProjectStartDate = function(projectId){
      if(projectId != undefined){
        ProjectService.getProjectById(projectId, function(data){
          $scope.projectStartDate = data.start_date;
          $scope.projectEndDate = data.end_date;
        });
      }
    }
    getProjectStartDate($routeParams.projectId);

  }
]);
