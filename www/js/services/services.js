
app.factory('RESTService', function ($http) {
  return {
    get:function (url, callback) {
      return $http({method:'GET', url:url})
      .success(function (data, status, headers, config) {
        //callback(data);
        //console.log(data.json);
      }).error(function (data, status, headers, config) {
        console.log("failed to retrieve data");
      });
    }
    //put

    //delete

    //post

  };
});

app.factory('AuthService', function () {
  var currentUser = null;
  var authorized = false;
  var initialState = true;

  return {
    initialState: function () {
      return initialState;
    },
    login: function (name, password) {
      currentUser = name;
      authorized = true;
      //console.log("Logged in as " + name);
      initialState = false;
    },
    logout: function () {
      currentUser = null;
      authorized = false;
    },
    isLoggedIn: function () {
      return authorized;
    },
    currentUser: function () {
      return currentUser;
    },
    authorized: function () {
      return authorized;
    }
  };
}
);
