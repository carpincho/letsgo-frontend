'use strict';

angular.module('myApp')
  .controller('TaskboardCtrl', ['$scope', '$routeParams', '$http', '$log', 'ProjectService', 'SprintService', function ($scope, $routeParams, $http, $log, ProjectService, SprintService) {

    var projectId = $routeParams.projectId;
    var sprintId = $routeParams.sprintId;
    //-----dummy data----
    var userStory = { description: "descript 1",
                      title: "title",
                      notes: "notas",
                      points: 20,
                      sprint_id: 2,
                    };
    var userStories = [userStory, userStory, userStory, userStory ];
    var task = { description: "task description",
                 story_id: 2,
                 owner: 2,
                 hr: 2
                };

  var tasks = [task, task, task]
  var storiesTasks = [{story: userStory, tasksNotStarted: tasks, Task: tasks},
                      {story: userStory, tasks: tasks},
                      {story: userStory, tasks: tasks}]

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
      $scope.userStories = userStories;
      // get tasks from user stories
      $scope.taks = tasks;
      $scope.storiesTasks = storiesTasks;
    }

  }
]);
