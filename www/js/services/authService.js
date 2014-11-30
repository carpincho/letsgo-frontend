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


      if (email != undefined && password != undefined){
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
      }
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
