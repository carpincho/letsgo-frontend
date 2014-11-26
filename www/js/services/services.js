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

      var payload = {
        email: email,
        password: password
      }

      //rememberMe is true if setted, undefined if not
      RESTService.post(sessions_uri, payload, function(data){
        $log.debug('Success logging in the user');

        authorized = true;
        initialState = false;
        currentUser = email;
        // check for data structure
        // validate data structure
        userInfo = data;

        $cookieStore.put( 'lets_go_session_client', authorized);
        $cookieStore.put( 'lets_go_user_info',userInfo);


        // show a success message
        //$scope.successMsgVisible = true;
        // let the message dissapear after 2 secs
        //$timeout(function() {$scope.successMsgVisible = false;}, 2000);
        // console.log("Logged in as " + email);
      });

    },

    logout: function () {
      RESTService.delete(sessions_uri, function(data){
        $log.debug('Success logging out the user');

        currentUser = null;
        authorized = false;
        userInfo = null;

        $cookieStore.remove('lets_go_session_client');
        $cookieStore.remove('lets_go_user_info');

        // show a success message
        //$scope.successMsgVisible = true;
        // let the message dissapear after 2 secs
        //$timeout(function() {$scope.successMsgVisible = false;}, 2000);
      });

    },

    isLoggedIn: function(){
      return authorized;
    },

    getUserInfo: function(){
      return userInfo;
    },

    setLoggedIn: function(status_var,user_info){
      authorized = status_var;
      userInfo = user_info;

    },

    currentUser: function(){
      return currentUser;
    },

    authorized: function(){
      return authorized;
    }

  };
});

app.factory('TaskService', ['$http', 'RESTService', function ($http, RESTService){
  var currentProjectID = 1;
  var currentSprintID = 1;
  var currentStoryID = 1;
  var currentProjectName = "pro1";
  var currentSprintName = "spr1";
  var currentStoryName = "sto1";

  return{

    getCurrentStory: function(){
      var currentStory = currentProjectName+" > "+currentSprintName+" > "+currentStoryName;
      return currentStory;
    },

    getCurrentStoryID:function(){
      return currentStoryID;
    },

    getTaskPath: function(){
      var taskPath = "/projects/" + currentProjectID + "/sprints/" + currentSprintID + "/stories/" + currentStoryID + "/tasks";
      return taskPath;
    },

    getAllTasks: function(projectId,sprintID,storyID){
      var get_all_tasks_url ='/projects/'+currentProjectID+'/sprints/'+currentSprintID+'/stories/'+currentStoryID+'/tasks';

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
  };
}]);
