app.factory('UserService', ['RESTService', function(RESTService){
  var baseUrl = '/users'

  return {

    getUserById: function(userId, callback, callback_error){
      var url = baseUrl + "/" + userId;
      RESTService.get(url, callback, callback_error);
  },

    createUser: function(payload, callback, callback_error){
      var url = baseUrl;
      RESTService.post(url, payload, callback, callback_error);
    },

    editUser: function(userId, payload, callback,callback_error){
      var url = baseUrl + "/" + userId;
      RESTService.put(url, payload, callback, callback_error);
    },

    changePassword: function(userId, payload, callback, callback_error){
      var url = baseUrl + "/" + userId;
      RESTService.put(url, payload, callback, callback_error);
    },

    deleteUser: function(userId, callback, callback_error){
      var url = baseUrl + "/" + userId;
      RESTService.delete(url, callback, callback_error);
    },
  }

}]);
