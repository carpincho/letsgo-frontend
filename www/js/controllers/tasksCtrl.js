'use strict';

angular.module('myApp')
  .controller('TasksCtrl', ['$scope', '$http', '$log', '$routeParams', 'taskService',
    function ($scope, $http, $log, $routeParams, taskService) {
      $scope.tasks = [];
      $scope.tasks = taskService.getAllTasks($routeParams.projectId,$routeParams.sprintID,$routeParams.sprintID);
    }
  ]);
