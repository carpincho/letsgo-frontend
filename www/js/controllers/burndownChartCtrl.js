'use strict';

angular.module('myApp')
.controller('BurndownChartCtrl', ['BurndownService', '$rootScope', 'SprintService', 'StoryService', 'TaskService', '$scope', '$routeParams', '$log', function (BurndownService, $rootScope, SprintService, StoryService, TaskService, $scope, $routeParams, $log) {

  var projectId = $routeParams.projectId;
  var sprintId = $routeParams.sprintId;

  var storyTotalPoints = 0;
  var totalDays = 0;

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
    var idealData = [];
    var m = (0 - $scope.totalPoints)/($scope.totalDays - 0)

    for (var i=0; i <= $scope.totalDays; i++){
      mylabels[i]= String(i);
      idealData[i] = (i*m) + $scope.totalPoints;
    }

    var data = {
      labels: mylabels,
      datasets: [
      {
        label: "Ideal Performance",
        fillColor: "rgba(155, 208, 161, 0.1)",
        strokeColor: "rgb(155, 208, 161)",
        pointColor: "rgba(155, 208, 161, 1.0)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#6e8164",
        pointHighlightStroke: "rgba(220,220,220, 1.0)",
        data: idealData,
      },

      /*{
        label: "Task Remaining",
        //fillColor: "rgba(155, 208, 161,0.2)",
        //strokeColor: "rgba(155, 208, 161, 1)",
        //pointColor: "rgba(155, 208, 161, 1)",
        //pointStrokeColor: "#fff",
        //pointHighlightFill: "#fff",
        //pointHighlightStroke: "rgba(151,187,205,1)",
        data: mydata, //[28, 48, 40, 19, 86, 27, 90]
      }*/
      ]
    };

    // expose the data to plot
    $scope.myData = data;

  });

  $scope.myOptions =  {
    // Chart.js options can go here.
  };

}
]);
