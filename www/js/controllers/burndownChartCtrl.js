'use strict';

angular.module('myApp')
.controller('BurndownChartCtrl', ['BurndownService', '$rootScope', 'SprintService', 'StoryService', 'TaskService', '$scope', '$routeParams', '$log', 'RESTService', 'AuthService', '$timeout', 'UserService', '$cookieStore', function (BurndownService, $rootScope, SprintService, StoryService, TaskService, $scope, $routeParams, $log, RESTService, AuthService, $timeout, UserService, $cookieStore) {

  var projectId = $routeParams.projectId;
  var sprintId = $routeParams.sprintId;

  var storyTotalPoints = 0;
  var totalDays = 0;

  //----
  var diffDays = function(firstDate, secondDate){
    var oneDay = 24*60*60*1000;
    var date1 = new Date(firstDate);
    var date2 = new Date(secondDate);
    return Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay)));
  }

  //--
  //var getRandomInt = function (min, max) {
  //  return Math.floor(Math.random() * (max - min + 1)) + min;
  //}

  var guideLine = function(){
    if(!angular.isUndefined(projectId) && !angular.isUndefined(sprintId)){

      SprintService.getSprintBySprintId(projectId, sprintId, function(sprint){
        totalDays = diffDays(sprint.start_date, sprint.end_date);

        StoryService.getStoriesBySprintId(projectId, sprintId, function(stories){
          storyTotalPoints = 0;

          angular.forEach(stories, function(story, key) {
            storyTotalPoints = storyTotalPoints + story.points;
          });
          BurndownService.prepForBroadcast(storyTotalPoints, totalDays);
        });
      });




    }
  };
  guideLine();

  $scope.$on('eventGotTotalPoints', function(){
    $scope.totalPoints = BurndownService.totalPoints;
    $scope.totalDays = BurndownService.totalDays;

    var mylabels = [];
    var mydata = [];

    for (var i=0; i < $scope.totalPoints; i++){
      mydata[i] = $scope.totalPoints-i;
    }

    for (var i=0; i < $scope.totalDays; i++){
      mylabels[i]= String(i);
    }
    //mydata[i] = $scope.totalPoints-i;


    //$scope.mylabels = mylabels;

    var data = {
      labels: mylabels,//["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11", "x12", "x13", "x14", "x15"],
      datasets: [
      {
        label: "Target",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: mydata, //[65, 59, 80, 81, 56, 55, 81, 56, 55, 81, 56, 55, 81, 56, 55,]
      },

      {
        label: "Task Remaining",
        fillColor: "rgba(155, 208, 161,0.2)",
        strokeColor: "rgba(155, 208, 161, 1)",
        pointColor: "rgba(155, 208, 161, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: mydata, //[28, 48, 40, 19, 86, 27, 90]
      }
      ]
    };
    $scope.myData = data;

  });





  //$scope.myData = data;

  $scope.myOptions =  {
    // Chart.js options can go here.
  };



}
]);



// StoryService.getStoriesBySprintId(projectId, sprintId, function(stories){
//   angular.forEach(stories, function(story, key) {
//     angular.forEach(story.tasks, function(taskId, key) {
//       TaskService.getTaskById(projectId, sprintId, story.id, taskId, function(task){
//
//
//       });
//     });
//   });
//
