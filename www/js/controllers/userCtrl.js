'use strict';

angular.module('myApp')
  .controller('UserCtrl', ['$scope', '$location', '$log', 'RESTService', function ($scope, $location, $log, RESTService) {

    var baseUsersUri = '/users'
    var userId = 1;
    var getUserUri = baseUsersUri + '/' + userId;
    var updateUserUri = baseUsersUri + "/" + userId;
    var passwordMinLenth = 6;

    $scope.cancelSignUp = function(){
      $location.path('/login');
    }

    $scope.signUp = function(email, firstname, lastname, password, confirmPassword){
      $scope.passwordMatch = false;

      var signupDataForm = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password
      };

      var payload = signupDataForm;

      if (password == confirmPassword && password.length > passwordMinLenth) {
        $scope.passwordMatch = true;

        RESTService.post(baseUsersUri, payload, function(data){
          //$log.debug('Success creating new project');
          console.log('Success creating new user');
          $location.path("/login");
        });
      }else{
        $scope.passwordMatch = false;
      }

    }

    $scope.editUser = function(email, firstname, lastname) {

      var payload = {
        id: userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
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
