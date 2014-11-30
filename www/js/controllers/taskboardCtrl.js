'use strict';

angular.module('myApp')
.controller('TaskboardCtrl', ['$scope', '$routeParams', '$http', '$log', 'ProjectService', 'AuthService','SprintService','StoryService','TaskService','SharedProjectSprintService','SharedStoryTaskService', function ($scope, $routeParams, $http, $log,ProjectService, AuthService,SprintService,StoryService,TaskService,SharedProjectSprintService,SharedStoryTaskService) {

  var projectId = $routeParams.projectId;
  var sprintId  = $routeParams.sprintId;
  $scope.projectId = projectId;
  $scope.sprintId = sprintId;
  $scope.stories= [];
  $scope.storiesTasks = [];
  $scope.taskboard =[];
  var allprojects = [];
  var storiesTask = [];

  var gettaskboard = function() {


    if (projectId != undefined && sprintId != undefined){


      ProjectService.getProjectById(projectId, function(data){
        $log.debug('Success getting project');
        $scope.project = data;


      });

      SprintService.getSprintBySprintId(projectId, sprintId, function(data){
        $log.debug('Success getting sprints');
        $scope.sprint = data;

        StoryService.getStoriesBySprintId(projectId,sprintId, function(data){
          $log.debug('Fetching ' + data.length + ' stories from server...');
          $scope.stories = data;



          var log = [];
          angular.forEach($scope.stories, function(value, key) {
            console.log(key + 'ID historia ' + value.id);

            TaskService.getAllTasks(projectId, sprintId, value.id,function(data){
              $log.debug('Fetching ' + data.length + ' tasks from server...');
              $scope.tasks = data;

              // for each de cada task y se lo agrega a la lista respectiva

              $scope.storiesTasks.push({story:value,tasks:$scope.tasks,task_Not_Started:$scope.task_Not_Started,task_In_Progress:$scope.task_In_Progress,task_Completed:$scope.task_Completed,task_Blocked:$scope.task_Blocked});


            });



          }, log);


        });



      });



    }

  }

  gettaskboard();


}
]);


/*
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
var storiesTasks = [{story: userStory, tasks: tasks},{story: userStory, tasks: tasks}]


*/
