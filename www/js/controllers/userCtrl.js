'use strict';

angular.module('myApp')
  .controller('UserCtrl', ['$scope', '$location', '$log', 'RESTService', function ($scope, $location, $log, RESTService) {

    var baseUsersUri = '/users'
    var userId = 1;
    var getUserUri = baseUsersUri + '/' + userId;
    var updateUserUri = baseUsersUri + "/" + userId;

    // -------------------------------------------------------

    var getUser = function(){
      RESTService.get(getUserUri, function(data){
        $scope.userInfo = data;
        //$log.debug(data)
        console.debug(data);
        console.log(data);
      });
    }
    getUser();

    $scope.editUser = function(email, firstname, lastname, password) {

      var payload = {
        id: userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }

      RESTService.put(updateUserUri, payload, function(data){
        //$log.debug('Success getting a project');
        console.log('Success editing user');
        $location.path('/user');
      });
    }

    $scope.cancelEditUser = function(){
      $location.path('/user');
    }


  }
]);
