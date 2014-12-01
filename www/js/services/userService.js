app.factory('UserService', ['$log', '$http', 'RESTService', function($log, $http, RESTService){
  var baseUrl = '/users'

  return {

    getUserById: function(userId, callback){
      var url = baseUrl + "/" + userId;
      RESTService.get(url, callback);
  },

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
