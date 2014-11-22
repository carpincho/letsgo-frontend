'use strict';

angular.module('myApp')
  .controller('ProjectsCtrl', ['$scope', '$location', '$http', '$log', '$routeParams',
    function ($scope, $location, $http, $log, $routeParams) {

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
        // put in a service
        var get_all_projects_uri = '/projects';

        $http.get(get_all_projects_uri)
          .success(function(data, status, header, config) {
            console.log('Fetching ' + data.length + ' projects from server...');
            $scope.projects = data;
          })
          .error(function(data, status) {
            //$log.debug('Error while fetching projects from server');
            console.log('Error while fetching projects from server');
          });

      }
      // fetch the existing projects in the server
      getProjects();


      $scope.cancelCreateProject = function(){
        // put in a service
        $location.path("/projects");
      }

      $scope.createProject = function(name, description, start_date, end_date, status) {
        // put in a service
        var create_project_uri = "/projects";

        var payload = {};
        // validate
        var ownerId = 1; //get owner

        var createFormData = {
          name: name,
          description: description,
          start_date: start_date,
          end_date: end_date,
          status: parseInt(status),
          owner: ownerId,
        }

        payload = createFormData

        $http.post(create_project_uri, payload)
         .success(function(data, status, header, config) {
           //$log.debug('Success creating new project');
           console.log('Success creating new project');
           $location.path("/projects");
        })
         .error(function(data, status) {
           //$log.debug('Error while trying to create a new project on server');
           console.log('Error while trying to create a new project on server');
        });

      }

      var getProject = function(projectId) {
        // put in a service
        var get_project_uri = "/projects/" +  projectId;

        var fetchedProject = {};
        if(typeof(projectId) == 'undefined' || projectId == null) {
          return fetchedProject;
        }

        $http.get(get_project_uri)
        .success(function(data, status, header, config) {
          //$log.debug('Success getting a project');
          console.log('Success getting a project');
          fetchedProject = data;
          $scope.project_retrieved = data;
          $scope.option_selected = getOptionByValue($scope.project_status_options, data.status)
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to getting a project on server');
          console.log('Error while trying to getting a project on server');
        });
      }
      // get project from url
      getProject($routeParams.projectId);


      $scope.cancelUpdateProject = function(){
        // put in a service
        $location.path("/projects");
      }

      $scope.updateProject = function(projectId, name, description, start_date, end_date, status) {
        // put in a service
        var update_project_uri = '/projects/' + projectId;

        var ownerId = 1; //get owner
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

         $http.put(update_project_uri, payload)
         .success(function(data, status, header, config) {
           //$log.debug('Success updating project');
           console.log('Success updating project');
           // put in a service
           $location.path('/projects');
         })
         .error(function(data, status) {
           //$log.debug('Error while trying to update project on server.');
           console.log('Error while trying to update project on server.');
         });
      }


      $scope.deleteProject = function(projectId) {
        // put in a service
        var delete_project_uri = '/projects/' + projectId;

        $log.debug('Deleting project '  + projectId);

        $http.delete(delete_project_uri)
          .success(function(data, status, header, config) {
            //$log.debug('Success deleting project');
            console.log('Success deleting project');
            getProjects();
          })
          .error(function(data, status) {
            //$log.debug('Error while trying to delete project on server');
            console.log('Error while trying to delete project on server');
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

        $log.debug('Inviting developers to project...');

        $http.put(invite_developers_to_project_uri, payload)
        .success(function(data, status, header, config) {
          //$log.debug('Success inviting developers to project');
          console.log('Success inviting developers to project');
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to invite developers to project on server.');
          console.log('Error while trying to invite developers to project on server.');
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

        $log.debug('Removing developers from project...');

        $http.put(remove_developers_to_project_uri, payload)
        .success(function(data, status, header, config) {
          //$log.debug('Success inviting developers to project');
          console.log('Success inviting developers to project');
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to invite developers to project on server.');
          console.log('Error while trying to invite developers to project on server.');
        });
      }



    }
  ]);
