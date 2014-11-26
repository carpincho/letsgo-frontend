'use strict';

angular.module('myApp')
  .controller('SprintsCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {

      $scope.sprints = [];



      $scope.createSprint = function(project_id, name, start_date, end_date) {
        var status = 0; // this is a bug in the api/database

        var payload = {};

        var createFormData = {
          project_id: project_id,
          name: name,
          start_date: start_date,
          end_date: end_date,
          status: parseInt(status), // bug in api
        }

        payload = createFormData

        RESTService.post(create_project_uri, payload, function(data){
          $log.debug('Success creating new project');
          $location.path("/projects");
        });
      }


      $scope.cancelCreateSprint = function(){
        $location.path("/projects");
      }





      // var getSprints = function() {
      //   // put in a service
      //   //var get_all_projects_uri = '/projects/:projectId/sprints';
      //
      //   var projectId = 1;
      //   var get_all_projects_uri = '/projects/' + projectId + '/sprints';
      //
      //   $http.get(get_all_projects_uri)
      //   .success(function(data, status, header, config) {
      //     console.log('Fetching ' + data.length + ' sprints from server...');
      //     $scope.sprints = data;
      //   })
      //   .error(function(data, status) {
      //     //$log.debug('Error while fetching projects from server');
      //     console.log('Error while fetching projects from server');
      //   });
      //
      // }
      // // fetch the existing projects in the server
      // getSprints();


    }
  ]);
