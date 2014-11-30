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
    },

    deleteUser: function(userId, callback){
      var url = baseUrl + "/" + userId;
      RESTService.delete(url, callback);
    },


  }

}]);
