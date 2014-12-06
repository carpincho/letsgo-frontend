'use strict';

angular.module('myApp')
.controller('BurndownChartCtrl', ['BurndownService', '$rootScope', 'SprintService', 'StoryService', 'TaskService', '$scope', '$routeParams', '$log', 'BurndownTaskDoneService', function (BurndownService, $rootScope, SprintService, StoryService, TaskService, $scope, $routeParams, $log, BurndownTaskDoneService) {

  var projectId = $routeParams.projectId;
  var sprintId = $routeParams.sprintId;

  var storyTotalPoints = 0;
  var totalDays = 0;
  var totalTasks = 0;
  $rootScope.totalTasksDone = 0;


  var diffDays = function(firstDate, secondDate){
    var oneDay = 24*60*60*1000;
    var date1 = new Date(firstDate);
    var date2 = new Date(secondDate);

    return Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay)));
  }

  var guideLine = function(){
    if(!angular.isUndefined(projectId) && !angular.isUndefined(sprintId)){

      SprintService.getSprintBySprintId(projectId, sprintId, function(sprint){
        totalDays = diffDays(sprint.start_date, sprint.end_date);

        StoryService.getStoriesBySprintId(projectId, sprintId, function(stories){
          storyTotalPoints = 0;
          totalTasks = 0;
          //totalTasksDone = 0;
          $rootScope.totalTasksDone = 0;

          angular.forEach(stories, function(story, key) {
            storyTotalPoints = storyTotalPoints + story.points;
            totalTasks = totalTasks + story.tasks.length;

            angular.forEach(story.tasks, function(taskId, key){
              TaskService.getTaskById(projectId, sprintId, story.id, taskId, function(task){
                if(task.status == TaskService.getValueFromLabel("Completed")){
                  $rootScope.totalTasksDone = $rootScope.totalTasksDone + 1;
                }
              });
            });
          });

          // we send the info to build the data
          BurndownService.prepForBroadcast(storyTotalPoints, totalDays, totalTasks);
        });
      });
    }
  };
  guideLine();

  $scope.$on('eventCoreInfoBurndown', function(){
    $scope.totalPoints = BurndownService.totalPoints;
    $scope.totalDays = BurndownService.totalDays;
    $scope.totalTasks = BurndownService.totalTasks;
    $scope.totalTasksDone = BurndownService.totalTasksDone;

    var mylabels = [];
    var idealData = [];
    var mydata = [];
    var m = (-$scope.totalTasks)/$scope.totalDays

    for (var i=0; i <= $scope.totalDays; i++){
      mylabels[i]= String(i);
      idealData[i] = (i*m) + $scope.totalTasks;
    }

    var data = {
      labels: mylabels,
      datasets: [
      {
        label: "Ideal Performance",
        fillColor: "rgba(155, 208, 161, 0.1)",
        strokeColor: "rgb(155, 208, 161)",
        pointColor: "rgb(155, 208, 161)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#6e8164",
        pointHighlightStroke: "rgba(220,220,220, 1.0)",
        data: idealData,
      },

      {
        label: "Task Remaining",
        fillColor: "rgba(155, 208, 161,0.2)",
        strokeColor: "rgba(155, 208, 161, 1)",
        pointColor: "rgba(155, 208, 161, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: mydata,
      }
      ]
    };

    // expose the data to plot
    $scope.myData = data;

  });

  $scope.myOptions =  {
  };

}
]);
