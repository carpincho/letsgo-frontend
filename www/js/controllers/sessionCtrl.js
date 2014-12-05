'use strict';

angular.module('myApp')
  .controller('SessionCtrl', ['$scope', '$http', '$log', '$timeout','$cookieStore', '$location', 'AuthService',
    function ($scope, $http, $log, $timeout, $cookieStore, $location, AuthService) {
      if (AuthService.isLoggedIn()){
        $location.path("/projects")
      }
    }
  ]);
