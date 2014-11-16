'use strict';

angular.module('myApp').controller('ProjectsCtrl', ['$scope','$modal', '$log', function ($scope, $modal, $log) {
      var owners = ["Graziela Pereiras", "Jorge Aviles Monroy", "Ke Li Huang"]
      var mySprint1 = { name: "Sprint 1", id: 1 };
      var mySprint2 = { name: "Sprint 2", id: 2 };
      var mySprint3 = { name: "Sprint 3", id: 3 };

      var mySprints = [mySprint1, mySprint2, mySprint3];

      var myProject1 = { id: 1, name: "Project 1", location: "/users/1/project/1",
                         sprints: mySprints, owner: owners[0],
                         status:"open",
                         date: "10/04/2014"
                       };

      var myProject2 = { id: 2, name: "Project 2", location: "/users/1/project/2",
                         sprints: [], owner: owners[1], status: "closed",
                         date: "3/04/2014"
                       };

      var myProject3 = { id: 3, name: "Project 3", location: "/users/1/project/3",
                         sprints: [], owner: owners[2], status: "open",
                         date: "22/01/2014"
                       };

      var myProjects = [ myProject1, myProject2, myProject3 ];



      $scope.projects = myProjects;
      $scope.sprints = mySprints;

      

  }
]);



// myApp.factory("createNewProject", function(){
//
//   var newProject = { id: 0, name: "", location: "", sprints: [], owner: "",
//                      status:"", date: "" };
//   return {
//       setId: function(newId){ newProject.id = newId; }
//       setName: function(newName){ newProject.newName = name; }
//       setLocation: function(newLocation){ newProject.location = newLocation; }
//       setSprints: function(newSprints){ newProject.sprints = newSprints; }
//       setOwner: function(newOwner){ newProject.owner = newOwner; }
//       setStatus: function(newStatus){ newProject.status = newStatus; }
//       setDate: function(newDate){ newProject.date = newDate; }
//       getId: function(){ return newProject.id; }
//       getName: function(){ return newProject.name; }
//       getLocation: function(){ return newProject.location; }
//       getSprints: function(){ return newProject.sprints; }
//       getOwner: function(){ return newProject.owner; }
//       getStatus: function(){ return newProject.status; }
//       getDate: function(){ return newProject.date; }
//   }
//
// });
