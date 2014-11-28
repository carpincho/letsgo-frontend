'use strict';

angular.module('myApp')
  .controller('ProjectsCtrl', ['$scope', '$location', '$http', '$log', '$routeParams', 'AuthService', 'SharedProjectSprintService', 'ProjectService', function ($scope, $location, $http, $log, $routeParams, AuthService, SharedProjectSprintService, ProjectService) {

      var userId = AuthService.getUserInfo();
      $scope.project_status_options = ProjectService.getProjectStatusOptions();
      $scope.projects = [];

      var getProjects = function() {
        ProjectService.getAllProjects(function(data){
          $log.debug('Fetching ' + data.length + ' projects from server...');
          $scope.projects = data;
        });
      }
      // fetch the existing projects as init
      getProjects();


      $scope.createProject = function(name, description, startDate, endDate, status) {
        var createFormData = {
          name: name,
          description: description,
          start_date: startDate,
          end_date: endDate,
          status: parseInt(status),
          owner: userId,
        }

        ProjectService.createProject(createFormData, function(data){
          $log.debug('Success creating new project');
          $location.path("/projects");
        });
      }


      $scope.cancelCreateProject = function(){
        $location.path("/projects");
      }


      var getProjectById = function(projectId) {
        if(projectId != undefined && projectId != null) {

          ProjectService.getProjectById(projectId, function(data){
            $log.debug('Success getting a project');
            $scope.project_retrieved = data;
            $scope.project_option_selected = ProjectService.getOptionByValue(data.status)
          });
        }
      }
      // get project from url
      getProjectById($routeParams.projectId);


      $scope.updateProject = function(projectId, name, description, start_date, end_date, status) {
        var updateFormData = {
          id: projectId,
          name: name,
          description: description,
          start_date: start_date,
          end_date: end_date,
          status: parseInt(status),
          owner: userId,
        }

        ProjectService.editProject(projectId, updateFormData, function(){
          $log.debug('Success updating a project');
          $location.path('/projects');
        });
      }


      $scope.cancelUpdateProject = function(){
        $location.path("/projects");
      }


      $scope.deleteProject = function(projectId) {
        ProjectService.deleteProject(projectId, function(data){
          $log.debug('Success deleting project');
          $scope.sendEventProjectId();
          getProjects();
        });
      }


      $scope.inviteDevelopersToProject = function(developers) {
        var projectId = 67;
        // var payload = developers;
        var payload = {
          devs: [1, 2]
        };

        ProjectService.inviteDevelopersToProject(projectId, payload, function(){
          $log.debug('Success inviting developers to project');
        });
      }


      $scope.removeDevelopersFromProject = function(developers) {
        var projectId = 67;
        // var payload = developers;
        var payload = {
          devs: [1, 2]
        };

        ProjectService.inviteDevelopersToProject(projectId, payload, function(){
          $log.debug('Success removing developers to project');
        });
      }

      $scope.sendEventProjectId = function(projectId){
        SharedProjectSprintService.prepForBroadcast(projectId);
      };


    }
  ]);
