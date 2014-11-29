'use strict';

angular.module('myApp')
  .controller('TaskboardCtrl', ['$scope', '$routeParams', '$http', '$log', 'ProjectService', 'SprintService', function ($scope, $routeParams, $http, $log, ProjectService, SprintService) {

    var projectId = $routeParams.projectId;
    var sprintId = $routeParams.sprintId;
    //-----dummy data----
    var userStory = { description: "User Story 1",
                      title: "Titulo de la historia de usuario 1",
                      notes: "notas",
                      points: 20,
                      sprint_id: 2,
                    };
    var userStories = [userStory, userStory, userStory, userStory ];
    var task = { description: "task 1 status 1",
                 story_id: 2,
                 owner: 2,
                 hr: 2,
                 status: 1,
                };


var task2 = { description: "task 2 status 2",
             story_id: 2,
             owner: 2,
             hr: 2,
             status: 2,
            };


var task3 = { description: "task 3 status 3",
             story_id: 2,
             owner: 2,
             hr: 2,
             status: 3,
            };


var task4 = { description: "task 4 status 4",
             story_id: 2,
             owner: 2,
             hr: 2,
             status: 4,
            };


  var tasks = [task, task2, task3, task4]
  var storiesTasks = [{story: userStory, tasks: tasks}]

    //-----end----

    if (projectId != undefined && sprintId != undefined){
      ProjectService.getProjectById(projectId, function(data){
          $log.debug('Success getting project');
          $scope.project = data;
      });

      SprintService.getSprintBySprintId(projectId, sprintId, function(data){
          $log.debug('Success getting sprints');
          $scope.sprint = data;
      });

      // get user stories from sprintId
      //$scope.userStories = userStories;
      // get tasks from user stories
    //  $scope.taks = tasks;
      $scope.storiesTasks = storiesTasks;
    }

  }
]);
