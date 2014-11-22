'use strict';

angular.module('myApp')
  .controller('ProjectsCtrl', ['$scope', '$location', '$http', '$log',
    function ($scope, $location, $http, $log) {

      $scope.projects = [];

      // hardcoded data for testing ----
      var mySprint1 = { id: 1,
                        project_id: 1,
                        name: "Sprint 1",
                        status: 0,
                        start_date:"10/04/2014",
                        end_date: "1/02/2015",
                      };

      var mySprint2 = { id: 2,
                        project_id: 1,
                        name: "Sprint 2",
                        status: 0,
                        start_date:"10/04/2014",
                        end_date: "1/02/2015",
                      };

      var mySprint3 = { id: 3,
                        project_id: 3,
                        name: "Sprint 1",
                        status: 1,
                        start_date:"10/04/2014",
                        end_date: "1/02/2015",
                      };


      //$scope.projects = [ myProject1, myProject2, myProject3 ];
      $scope.sprints = [mySprint1, mySprint2, mySprint3];
      // ------------------------
      // this should be moved to constants
      $scope.project_status_options = [
        { label:'open', value: 0 },
        { label:'closed', value: 1 },
      ];


      var init = function() {
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

      }();


      $scope.cancelCreateProject = function(){
        $location.path("/projects");
      }

      $scope.createProject = function(project_name, project_description, project_start_date, project_end_date, project_status) {
        var payload = {};

        // validate and use service api
        var ownerId = 1; //get owner

        var create_project_uri = "/projects";

        var createFormData = {
          name: project_name,
          description: project_description,
          start_date: project_start_date,
          end_date: project_end_date,
          status: parseInt(project_status),
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

      $scope.getProject = function(projectId) {
        //var id = projectId;
        var id = 28;

        var get_project_uri = "/projects/" +  id;

        $http.get(get_project_uri)
        .success(function(data, status, header, config) {
          //$log.debug('Success getting a project');
          console.log('Success getting a project');
          // save it $scope.projects
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to getting a project on server');
          console.log('Error while trying to getting a project on server');
        });
      }


      $scope.updateProject = function(updateProject) {
        //var payload = updateProject;

        var payload = {
          id: 8,
          name: "Keli tu madre",
          description: "another brief description",
          owner: 1,
          status: 1,
          start_date: "2014-10-2",
          end_date: "2015-02-22"
        };

        var my_id = 8;
        var update_project_uri = '/projects/8';
        //  /users/{user_id}/projects/{project_id} [ PUT ]

        $http.put(update_project_uri, payload)
        .success(function(data, status, header, config) {
          //$log.debug('Success updating project');
          console.log('Success updating project');
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to update project on server.');
          console.log('Error while trying to update project on server.');
          console.log(data);
        });
      }


      $scope.deleteProject = function(projectId) {
        var id = projectId;
        var my_id = 8;

        $log.debug("Deleting project " + my_id);

        var delete_project_uri = "/projects/" + my_id;

        $http.delete(delete_project_uri)
          .success(function(data, status, header, config) {
            //$log.debug('Success deleting project');
            console.log('Success deleting project');

          })
          .error(function(data, status) {
            //$log.debug('Error while trying to delete project on server');
            console.log('Error while trying to delete project on server');
            console.log(data)
          });
      }


      $scope.inviteDevelopersToProject = function(developers) {
        // var payload = developers;
        var payload = {
          devs: [1, 2]
        };

        $log.debug("Inviting developers to project...");

        var invite_developers_to_project_uri = '/projects/1/';

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
        // var payload = developers;
        var payload = {
          devs: [1, 2]
        };

        $log.debug("Removing developers from project...");

        var remove_developers_to_project_uri = "/projects/1/";

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
