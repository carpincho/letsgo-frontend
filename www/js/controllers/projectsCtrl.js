'use strict';

angular.module('myApp')
  .controller('ProjectsCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {

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

      var myProject1 = { id: 1,
                         name: "Project 1",
                         description: "a brief description",
                         owner: 1,
                         status:"open",
                         start_date: "10/04/2014",
                         end_date: ""
      };

      var myProject2 = { id: 2,
                         name: "Project 2",
                         description: "another brief description",
                         owner: 1,
                         status:"open",
                         start_date: "10/04/2014",
                         end_date: ""
      };

      var myProject3 = { id: 3,
                         name: "Project 3",
                         description: "another brief description",
                         owner: 2,
                         status:"closed",
                         start_date: "10/04/2014",
                         end_date: "1/02/2015"
      };

      //$scope.projects = [ myProject1, myProject2, myProject3 ];
      $scope.sprints = [mySprint1, mySprint2, mySprint3];
      // ------------------------


      var init = function() {
        $http.get('/users/1/projects')
          .success(function(data, status, header, config) {

            // the server json response
            //$scope.projects = data; <!-- the real response -->
            //console.log(JSON.stringify(data[0]));
            $scope.projects = data;


          })
          .error(function(data, status) {
            $log.debug('Error while fetching todos from server');
          });

      }();

      $scope.createProject = function(newProject) {
        //payload = newProject;
        //dummy project
        var payload = {
          name: "Project 5",
          description: "this is a new project created",
          owner: 1,
          status:"closed",
          start_date: "10/04/2014",
          end_date: "1/02/2015"
        };

        $log.debug("Sending new project with payload: " + JSON.stringify(payload));

        $http.post('/projects/', payload)
        .success(function(data, status, header, config) {
          //$log.debug('Success creating new project');
          console.log('Success creating new project');
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to create a new project on server');
          console.log('Error while trying to create a new project on server');
        });
      }


      $scope.getProject = function(projectId) {
        //var id = projectId;
        var id = 1;

        $log.debug("Sending id for getting a project: " + JSON.stringify(payload));

        $http.get('/projects/' +  id)
        .success(function(data, status, header, config) {
          //$log.debug('Success getting a project');
          console.log('Success getting a project');
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to getting a project on server');
          console.log('Error while trying to getting a project on server');
        });
      }


      $scope.updateProject = function(updateProject) {
        // var payload = updateProject;
        var payload = {
          id: 3,
          name: "Project 3",
          description: "another brief description",
          owner: 2,
          status:"closed",
          start_date: "10/04/2014",
          end_date: "1/02/2015"
        };

        $log.debug("Updating project " + project.id);

        $http.put('/projects/' + project.id, payload)
        .success(function(data, status, header, config) {
          //$log.debug('Success updating project');
          console.log('Success updating project');
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to update project on server.');
          console('Error while trying to update project on server.');
        });
      }


      $scope.deleteProject = function(projectId) {
        //var id = projectId;
        var id = 2;

        $log.debug("Deleting project " + id);

        $http.delete('/projects/' + id)
          .success(function(data, status, header, config) {
            $log.debug('Success deleting project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to delete project on server');
          });
      }


      $scope.inviteDevelopersToProject = function(developers) {
        // var payload = developers;
        var payload = {
          devs: [1, 2]
        };

        $log.debug("Inviting developers to project...");

        $http.put('/projects/', payload)
        .success(function(data, status, header, config) {
          //$log.debug('Success inviting developers to project');
          console.log('Success inviting developers to project');
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to invite developers to project on server.');
          console('Error while trying to invite developers to project on server.');
        });
      }


      $scope.removeDevelopersFromProject = function(developers) {
        // var payload = developers;
        var payload = {
          devs: [1, 2]
        };

        $log.debug("Removing developers from project...");

        $http.put('/projects/', payload)
        .success(function(data, status, header, config) {
          //$log.debug('Success inviting developers to project');
          console.log('Success inviting developers to project');
        })
        .error(function(data, status) {
          //$log.debug('Error while trying to invite developers to project on server.');
          console('Error while trying to invite developers to project on server.');
        });
      }



    }
  ]);
