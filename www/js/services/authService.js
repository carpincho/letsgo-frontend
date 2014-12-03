app.factory('AuthService', function($http, $log, $timeout, $location, $cookieStore, RESTService){
  var currentUser = null;
  var userInfo = null;
  var authorized = false;
  var initialState = true;
  var sessions_uri = '/sessions';
  var baseUrl = '/sessions';

  return {
    initialState: function(){
      return initialState;
    },

    login: function(payload, callback, callback_error){
      var url = baseUrl;
      RESTService.post(url, payload, callback, callback_error);
    },


    // login: function (email, password, rememberMe){
    //   var payload = {
    //     email: email,
    //     password: password
    //   }
    //
    //
    //   if (email != undefined && password != undefined){
    //     //rememberMe is true if setted, undefined if not
    //     RESTService.post(sessions_uri, payload, function(data){
    //       $log.debug('Success logging in the user');
    //
    //       authorized = true;
    //       initialState = false;
    //       currentUser = email;
    //       // check for data structure
    //       // validate data structure
    //       userInfo = data;
    //
    //       $cookieStore.put( 'lets_go_session_client', authorized);
    //       $cookieStore.put( 'lets_go_user_info',userInfo);
    //     }, function(data){
    //       console.log("tu vieja en tanga")});
    //   }else{
    //     console.log("llego todo undefined");
    //   }
    // },

    logout: function () {
      RESTService.delete(sessions_uri, function(data){
        $log.debug('Success logging out the user');

        currentUser = null;
        authorized = false;
        userInfo = null;

        $cookieStore.remove('lets_go_session_client');
        $cookieStore.remove('lets_go_user_info');
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

    setInitialState: function(state){
      initialState = state;
    },

    setCurrentUser: function(email){
      currentUser = email;
    },

    setUserInfo: function(userInfo){
      userInfo = userInfo;
    },

    currentUser: function(){
      return currentUser;
    },

    authorized: function(){
      return authorized;
    }

  };
});
