'use strict';

app.factory('RESTService', ['$http', '$log', function ($http, $log){
  return {
    get: function (url, callback, callback_error) {
      return $http({ method:'GET', url:url })
      .success(function (data, status, headers, config){
        callback(data);
      })
      .error(function (data, status, headers, config){
        if (!angular.isUndefined(callback_error)){
          callback_error(data);
        }
        $log.error("failed to GET data!");
      });
    },

    post: function(url, payload, callback, callback_error){
      return $http({ method:'POST', url:url, data:payload })
      .success(function (data, status, headers, config){
        callback(data);
      })
      .error(function (data, status, headers, config){
        if (!angular.isUndefined(callback_error)){
          callback_error(data);
          $log.error("failed to POST data!");
        }
      });
    },

    put: function(url, payload, callback, callback_error){
      return $http({ method:'PUT', url:url, data:payload })
      .success(function(data, status, headers, config){
        callback(data);
      })
      .error(function(data, status, headers, config){
        if (!angular.isUndefined(callback_error)){
          callback_error(data);
        }
        $log.error("failed to PUT data!");
      })
    },

    delete: function(url, callback, callback_error){
      return $http({ method:'DELETE', url:url })
      .success(function(data, status, headers, config){
        callback(data);
      })
      .error(function(data, status, headers, config){
        if (!angular.isUndefined(callback_error)){
          callback_error(data);
        }
        $log.error("failed to DELETE data!");
      })
    }

  };
}]);

app.factory('SharedProjectSprintService', function($rootScope){
  var projectId;
  var sharedService = {
      projectId: projectId,
  };

  sharedService.prepForBroadcast = function(projectId){
    this.projectId = projectId;
    this.broadcastItem();
  };

  sharedService.broadcastItem = function(){
    $rootScope.$broadcast('eventGetRelatedSprints');
  }

  return sharedService;
});


app.factory('SharedStoryTaskService', function($rootScope){
  var projectId;
  var sprintId;
  var storyId;
  var sharedService = {
      projectId: projectId,
      sprintId: sprintId,
      storyId: storyId,
  };

  sharedService.prepForBroadcast = function(projectId,sprintId,storyId){
    this.projectId = projectId;
    this.sprintId = sprintId;
    this.storyId = storyId;
    this.broadcastItem();
  };

  sharedService.broadcastItem = function(){
    $rootScope.$broadcast('eventGetRelatedStory');
  }

  return sharedService;
});


app.factory('BurndownService', function(){
  var totalDays = 0;
  var totalPoints = 0;

  var sharedService = {
    totalDays: totalDays,
    totalPoints: totalPoints,
  };

  sharedService.setTotalDays = function(value){
    totalDays = value;
  }

  sharedService.setTotalPoints = function(value){
    totalPoints = value;

  }

  sharedService.getTotalDays = function(){
    return totalDays;
  }

  sharedService.getTotalPoints = function(){
    return totalPoints;
  }

  return sharedService;
});
