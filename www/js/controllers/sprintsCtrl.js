'use strict';

angular.module('myApp')
  .controller('SprintsCtrl', ['$location', '$scope', '$http', '$log', '$routeParams', 'RESTService', 'SharedProjectSprintService', function ($location, $scope, $http, $log, $routeParams, RESTService, SharedProjectSprintService) {

      $scope.sprints = [];
      var projectId;


      $scope.$on('eventGetRelatedSprints', function(){
        $scope.projectId = SharedProjectSprintService.projectId;
        $scope.sprint = getSprints(SharedProjectSprintService.projectId);
      });


      var getSprints = function(projectId) {
       // put in a service

        if (projectId != undefined){
          var get_all_sprints_uri = '/projects/' + projectId + '/sprints';

          RESTService.get(get_all_sprints_uri, function(data){
            $log.debug('Success getting a sprints');
            $scope.sprints = data;
          });

        }
      }
      // fetch the existing projects in the server

      $scope.createSprint = function(name, start_date, end_date) {
        var status = 0; // this is a bug in the api/database
        var projectId = $routeParams.projectId;

        if (projectId != undefined){
          var create_sprint_uri = '/projects/'+ projectId + '/sprints'

          var createFormData = {
            project_id: projectId,
            name: name,
            start_date: start_date,
            end_date: end_date,
            status: parseInt(status), // bug in api
          }

          RESTService.post(create_sprint_uri, createFormData, function(data){
            $log.debug('Success creating new project');
            $location.path("/projects");
          });

        }
      }


      $scope.cancelCreateSprint = function(){
        $location.path("/projects");
      }


      $scope.deleteSprint = function(projectId, sprintId) {
        var delete_project_uri = '/projects/' + projectId + '/sprints/' + sprintId;

        RESTService.delete(delete_project_uri, function(data){
          $log.debug('Success deleting project');
          getSprints(projectId);
        });
      }


      $scope.updateSprint = function(projectId, name, start_date, end_date, status) {
        // put in a service
        // projects/:projectId/sprint/edit/:projectId', {

        var sprintId = $routeParams.sprintId;
        var projectId = $routeParams.projectId;

        if(sprintId != undefined && projectId != undefined){
          var update_sprint_uri = '/projects/' + projectId + '/sprints/' + sprintId;
          var updateFormData = {
            id: projectId,
            name: name,
            start_date: start_date,
            end_date: end_date,
            status: status,
          }

          $log.debug("puto el que lee" + updateFromData);
        }




      //  RESTService.put(update_sprint_uri, updateFormData, function(data){
      //    $log.debug('Success updating a sprint');
      //    $location.path('/projects');
      //  });

      }




      $scope.cancelEditSprint = function(){
        $location.path("/projects");
      }





    }
  ]);
