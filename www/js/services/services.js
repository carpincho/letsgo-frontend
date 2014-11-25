'use strict';

app.factory('RESTService', function ($http){
  return {
    get: function (url, callback) {
      return $http({method:'GET', url:url})
      .success(function (data, status, headers, config){
        callback(data);
      })
      .error(function (data, status, headers, config){
        console.log("failed to get data");
      });
    },

    post: function(url, payload, callback){
      return $http({method:'POST', url:url, data:payload})
      .success(function (data, status, headers, config){
        callback(data);
      })
      .error(function (data, status, headers, config){
        console.log("failed to post data");
      });
    },

    put: function(url, payload, callback){
      return $http({method:'PUT', url:url, data:payload})
      .success(function(data, status, headers, config){
        callback(data);
      })
      .error(function(data, status, headers, config){
        console.log("failed to put data");
      })
    },

    delete: function(url, callback){
      return $http({method:'DELETE', url:url})
      .success(function(data, status, headers, config){
        callback(data);
      })
      .error(function(data, status, headers, config){
        console.log("failed to delete data");
      })
    }

  };
});


app.factory('AuthService', function($http, $log, $timeout, $cookieStore, RESTService){
  var currentUser = null;
  var userInfo = null;
  var authorized = false;
  var initialState = true;
  var sessions_uri = '/sessions';

  return {
    initialState: function(){
      return initialState;
    },

    login: function (email, password, rememberMe){
      currentUser = email;

      var payload = {
        email: email,
        password: password
      }

      //rememberMe is true if setted, undefined if not

      RESTService.post(sessions_uri, payload, function(data){
        //$log.debug('Success logging in the user');
        console.log('Success logging in the user');

        authorized = true;
        initialState = false;

        $cookieStore.put( 'lets_go_session_client', authorized);

        // show a success message
        //$scope.successMsgVisible = true;
        // let the message dissapear after 2 secs
        //$timeout(function() {$scope.successMsgVisible = false;}, 2000);
        // console.log("Logged in as " + email);
      });

    },

    logout: function () {
      var sessions_uri = '/sessions';

      RESTService.delete(sessions_uri, function(data){
        //console.debug('Success logging out the user');
        console.log('Success logging out the user');

        currentUser = null;
        authorized = false;

        $cookieStore.remove('lets_go_session_client');

        // show a success message
        //$scope.successMsgVisible = true;
        // let the message dissapear after 2 secs
        //$timeout(function() {$scope.successMsgVisible = false;}, 2000);
      });

    },

    isLoggedIn: function(){
      return authorized;
    },

    setLoggedIn: function(status_var){
      authorized=status_var;
    },

    currentUser: function(){
      return currentUser;
    },

    authorized: function(){
      return authorized;
    }

  };
});

app.factory('taskService',['$http','RESTService',function ($http,RESTService){
  return{
    getAllTasks: function(projectId,sprintID,storyID){
      var get_all_tasks_url ='/projects/'+projectId+'/sprints/'+sprintID+'/stories/'+storyID+'/tasks';

      var fetchedProject = {};
      var fetchedSprint = {};
      var fetchedStory = {};
      if(typeof(projectId) == 'undefined' || projectId == null) {
        return fetchedProject;
      }
      if(typeof(sprintID) == 'undefined' || sprintID == null) {
        return fetchedSprint;
      }
      if(typeof(storyID) == 'undefined' || storyID == null) {
        return fetchedStory;
      }

      RESTService.get(get_all_tasks_url, function(data){
        console.log('Fetching ' + data.length + ' tasks from server...');
      });
      return data;

    }// fetch the existing projects in the server
  }

}]);
