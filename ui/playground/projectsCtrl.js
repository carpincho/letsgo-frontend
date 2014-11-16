'use strict';

angular.module('myApp').controller('ProjectsCtrl', ['$scope', function ($scope) {
      var owners = ["Graziela Pereiras", "Jorge Aviles Monroy", "Ke Li Huang"]
      var mySprint1 = { name: "Sprint 1", id: 1 };
      var mySprint2 = { name: "Sprint 2", id: 2 };
      var mySprint3 = { name: "Sprint 3", id: 3 };

      var mySprints = [mySprint1, mySprint2, mySprint3];

      var myProject1 = { id: 1, name: "Project 1", location: "/users/1/project/1",
                         sprints: mySprints, owner: owners[0],
                         status:"open"
                       };

      var myProject2 = { id: 2, name: "Project 2", location: "/users/1/project/2",
                         sprints: [], owner: owners[1], status: "closed"
                       };

      var myProject3 = { id: 3, name: "Project 3", location: "/users/1/project/3",
                         sprints: [], owner: owners[2], status: "open"
                       };

      var myProjects = [ myProject1, myProject2, myProject3 ];

      $scope.projects = myProjects;
      $scope.sprints = mySprints;

    }
]);
