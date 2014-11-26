'use strict';

angular.module('myApp')
  .controller('ProjectsCtrl', ['$scope', '$location', '$http', '$log', '$routeParams', 'RESTService', 'AuthService', function ($scope, $location, $http, $log, $routeParams, RESTService, AuthService) {
      var get_all_projects_uri = '/projects';
      var create_project_uri = "/projects";


      var ownerId = AuthService.getUserInfo();
      $scope.projects = [];

      // ------------------------
      // this should be moved to constants
      $scope.project_status_options = [
        { label:'open', value: 0 },
        { label:'closed', value: 1 },
      ];

      var getOptionByValue = function (options, value){
        var i = 0;
        var foundOption = {};

        for (i=0; i < options.length; i++){
          if(options[i].value == value){
            foundOption = options[i]
            break;
          }
        }
        return foundOption;
      }

      // ------------------------

      var getProjects = function() {
        RESTService.get(get_all_projects_uri, function(data){
          $log.debug('Fetching ' + data.length + ' projects from server...');
          $scope.projects = data;
        });
      }
      // fetch the existing projects in the server
      getProjects();


      $scope.createProject = function(name, description, start_date, end_date, status) {
        var payload = {};

        var createFormData = {
          name: name,
          description: description,
          start_date: start_date,
          end_date: end_date,
          status: parseInt(status),
          owner: ownerId,
        }

        payload = createFormData

        RESTService.post(create_project_uri, payload, function(data){
          $log.debug('Success creating new project');
          $location.path("/projects");
        });
      }


      $scope.cancelCreateProject = function(){
        $location.path("/projects");
      }


      var getProject = function(projectId) {
        var get_project_uri = "/projects/" +  projectId;

        var fetchedProject = {};
        if(typeof(projectId) == 'undefined' || projectId == null) {
          return fetchedProject;
        }

        RESTService.get(get_project_uri, function(data){
          $log.debug('Success getting a project');
          fetchedProject = data;
          $scope.project_retrieved = data;
          $scope.option_selected = getOptionByValue($scope.project_status_options, data.status)
        });
      }
      // get project from url
      getProject($routeParams.projectId);


      $scope.updateProject = function(projectId, name, description, start_date, end_date, status) {
        // put in a service
        var update_project_uri = '/projects/' + projectId;

        var payload;

        var updateFormData = {
          id: projectId,
          name: name,
          description: description,
          start_date: start_date,
          end_date: end_date,
          status: parseInt(status),
          owner: ownerId,
        }

        payload = updateFormData;

        RESTService.put(update_project_uri, payload, function(data){
          $log.debug('Success updating a project');
          $location.path('/projects');
        });

      }


      $scope.cancelUpdateProject = function(){
        $location.path("/projects");
      }


      $scope.deleteProject = function(projectId) {
        var delete_project_uri = '/projects/' + projectId;

        RESTService.delete(delete_project_uri, function(data){
          $log.debug('Success deleting project');
          getProjects();
        });
      }


      $scope.inviteDevelopersToProject = function(developers) {
        var projectId = 67;

        // put in a service
        var invite_developers_to_project_uri = '/projects/' + projectId + '/invite_devs';

        // var payload = developers;
        var payload = {
          devs: [1, 2]
        };
    

        $http.put(invite_developers_to_project_uri, payload)
        .success(function(data, status, header, config) {
          $log.debug('Success inviting developers to project');
        })
        .error(function(data, status) {
          $log.debug('Error while trying to invite developers to project on server');
        });
      }


      $scope.removeDevelopersFromProject = function(developers) {
        var projectId = 67;
        // put in a service
        var remove_developers_to_project_uri = '/projects/' + projectId + '/remove_devs';

        // var payload = developers;
        var payload = {
          devs: [1, 2]
        };


        $http.put(remove_developers_to_project_uri, payload)
        .success(function(data, status, header, config) {
          $log.debug('Success removing developers from project...');
        })
        .error(function(data, status) {
          $log.debug('Error while trying to remove invited developers to project');
        });
      }
    }
  ]);
