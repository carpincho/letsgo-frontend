'use strict';

app.factory('RESTService', ['$http', '$log', function ($http, $log){
  return {
    get: function (url, callback) {
      return $http({method:'GET', url:url})
      .success(function (data, status, headers, config){
        callback(data);
      })
      .error(function (data, status, headers, config){
        $log.error("failed to get data");
      });
    },

    post: function(url, payload, callback){
      return $http({method:'POST', url:url, data:payload})
      .success(function (data, status, headers, config){
        callback(data);
      })
      .error(function (data, status, headers, config){
        $log.error("failed to post data");
      });
    },

    put: function(url, payload, callback){
      return $http({method:'PUT', url:url, data:payload})
      .success(function(data, status, headers, config){
        callback(data);
      })
      .error(function(data, status, headers, config){
        $log.error("failed to put data");
      })
    },

    delete: function(url, callback){
      return $http({method:'DELETE', url:url})
      .success(function(data, status, headers, config){
        callback(data);
      })
      .error(function(data, status, headers, config){
        $log.error("failed to delete data");
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
