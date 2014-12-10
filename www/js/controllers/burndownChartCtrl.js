'use strict';

angular.module('myApp')
.controller('BurndownChartCtrl', ['BurndownChartService', '$rootScope', 'SprintService', 'StoryService', 'TaskService', '$scope', '$routeParams', '$log', 'BurndownTaskDoneService', function (BurndownChartService, $rootScope, SprintService, StoryService, TaskService, $scope, $routeParams, $log, BurndownTaskDoneService) {

  var projectId = $routeParams.projectId;
  var sprintId = $routeParams.sprintId;
  var totalDays = 0;



  var diffDays = function(firstDate, secondDate){
    var oneDay = 24*60*60*1000;
    var date1 = new Date(firstDate);
    var date2 = new Date(secondDate);

    return Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay)));
  }

  var  addDays = function(date, days) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  var formattedDate = function(date) {
    var d = new Date(date || Date.now()),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
  }


  var guideLine = function(){
    if(!angular.isUndefined(projectId) && !angular.isUndefined(sprintId)){


      SprintService.getSprintBySprintId(projectId, sprintId, function(sprint){
        totalDays = diffDays(sprint.start_date, sprint.end_date);


        $scope.start_date = sprint.start_date;
        $scope.end_date = sprint.end_date;
        $scope.name_burndownchart = sprint.name;

        BurndownChartService.getBurndownChartBySprintId(projectId,sprintId, function(brundown){
          $log.debug('Fetching ' + brundown.length + ' stories from server...');
          $scope.burndown = brundown;

          var mylabels = [];
          var idealData = [];
          var mydata = brundown.tasks_remaining;
          var m = (-brundown.total_task_count)/totalDays;
          var date_control = new Date();


          for (var i=0; i <= totalDays; i++){
            mylabels[i]= String(i);
            idealData[i] = (i*m) + brundown.total_task_count;


            if(i==0){
              date_control = new Date($scope.start_date) ;
              mylabels[i]= formattedDate(date_control);

            }else{

              date_control = addDays(date_control,1);
              mylabels[i]= formattedDate(date_control);
            }



          }

          var data = {
            labels: mylabels,
            datasets: [
            {
              label: "Ideal Performance",
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
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



      });


    }
  };
  guideLine();
}
]);
