app.factory('UserService', ['$log', '$http', 'RESTService', function($log, $http, RESTService){
  var baseUrl = '/users'

  //var userId = AuthService.getUserInfo();
//  var getUserUri = baseUrl + '/' + userId;
//  var updateUserUri = baseUrl + "/" + userId;
//  var deleteUserUri = baseUrl + "/" + userId;


  return {

    createUser: function(payload, callback){
      var url = baseUrl;
      RESTService.post(url, payload, callback);
    },

    editUser: function(userId, payload, callback){
      var url = baseUrl + "/" + userId;
      RESTService.put(url, payload, callback);
    },

    changePassword: function(userId, payload, callback){
      var url = baseUrl + "/" + userId;
      RESTService.put(url, payload, callback);
    }

    // getProjectById: function (projectId, callback) {
    //   var url = baseUrl + "/" + projectId;
    //   RESTService.get(url, callback);
    // },
    //
    // createProject: function(payload, callback){
    //   var url = baseUrl;
    //   RESTService.post(url, payload, callback);
    // },
    //
    // editProject: function(projectId, payload, callback){
    //   var url = baseUrl + "/" + projectId;
    //   RESTService.put(url, payload, callback);
    // },
    //
    // deleteProject: function(projectId, callback){
    //   var url = baseUrl + "/" + projectId;
    //   RESTService.delete(url, callback);
    // },
    //
    // inviteDevelopersToProject: function(projectId, developers, callback){
    //   var url = baseUrl + "/" + projectId;
    //   RESTService.put(url, developers, callback);
    // },
    //
    // removeDevelopersFromProject: function(projectId, developers, callback){
    //   var url = baseUrl + "/" + projectId;
    //   RESTService.put(url, developers, callback);
    // },
  }

}]);
