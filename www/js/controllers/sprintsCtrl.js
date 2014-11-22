'use strict';

angular.module('myApp')
  .controller('SprintsCtrl', ['$scope', '$http', '$log',
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
      //----

      //$scope.sprints = [mySprint1, mySprint2, mySprint3];

      var getSprints = function() {
        // put in a service
        //var get_all_projects_uri = '/projects/:projectId/sprints';

        var projectId = 1;
        var get_all_projects_uri = '/projects/' + projectId + '/sprints';

        $http.get(get_all_projects_uri)
        .success(function(data, status, header, config) {
          console.log('Fetching ' + data.length + ' sprints from server...');
          $scope.sprints = data;
        })
        .error(function(data, status) {
          //$log.debug('Error while fetching projects from server');
          console.log('Error while fetching projects from server');
        });

      }
      // fetch the existing projects in the server
      getSprints();


    }
  ]);
