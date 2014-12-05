app.factory('AuthService', function($http, $log, $timeout, $location, $cookieStore, RESTService){
  var currentUser = null;
  var userInfo = null;
  var authorized = false;
  var initialState = true;
  var baseUrl = '/sessions';

  return {
    initialState: function(){
      return initialState;
    },

    login: function(payload, callback, callback_error){
      var url = baseUrl;
      RESTService.post(url, payload, callback, callback_error);
    },

    logout: function (callback, callback_error) {
      var url = baseUrl;
      RESTService.delete(baseUrl, callback, callback_error);
    },

    isLoggedIn: function(){
      return authorized || false;
    },

    getUserInfo: function(){
      //user id
      return userInfo;
    },

    setLoggedIn: function(status_var,user_info){
      authorized = status_var;
      userInfo = user_info;

    },

    setInitialState: function(state){
      initialState = state;
    },

    setCurrentUser: function(email){
      currentUser = email;
    },

    setUserInfo: function(value){
      userInfo = value;
    },

    currentUser: function(){
      return currentUser;
    },

    authorized: function(){
      return authorized;
    }

  };
});
