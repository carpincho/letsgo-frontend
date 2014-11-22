'use strict';

// simple stub that could use a lot of work...
app.factory('RESTService',
function ($http) {
  return {
    get:function (url, callback) {
      return $http({method:'GET', url:url}).
      success(function (data, status, headers, config) {
        callback(data);
        //console.log(data.json);
      }).
      error(function (data, status, headers, config) {
        console.log("failed to retrieve data");
      });
    }
  };
}
);


// simple auth service that can use a lot of work...
app.factory('AuthService',function ( $http, $log, $timeout, $cookieStore) {
  var currentUser = null;
  var authorized = false;

  // initMaybe it wasn't meant to work for mpm?ial state says we haven't logged in or out yet...
  // this tells us we are in public browsing
  var initialState = true;

  return {
    initialState:function () {
      return initialState;
    },
    login:function (email, password) {
      currentUser = email;
  // the payload is simple the json object that we used for binding to the input
      var payload = {
        email: email,
        password: password
      }

      $http.post('/sessions', payload)
      .success(function(data, status, header, config) {

        //$log.debug('Success logging in the user');
        console.log('Success logging in the user');

        // show a success message
        //$scope.successMsgVisible = true;
        // let the message dissapear after 2 secs
        //  $timeout(function() {$scope.successMsgVisible = false;}, 2000);
        //logged = true;
        authorized = true;
        initialState = false;
        console.log("Logged in as " + email);

      })
      .error(function(data, status) {
        //$log.debug('Error while trying to login user.');
        console.log('Error while trying to login user.');
        // show a success message
        //$scope.errorMsgVisible = true;
        // let the message dissapear after 2 secs
        //  $timeout(function() {$scope.errorMsgVisible = false;}, 2000);
      });
      
    },
    logout:function () {
      currentUser = null;
      authorized = false;
    },
    isLoggedIn:function () {
      console.log("Is loggged? " + authorized);

      return authorized;

    },
    currentUser:function () {
      return currentUser;
    },
    authorized:function () {
      return authorized;
    }
  };
}
);
