'use strict';

angular.module('myApp')
  .controller('UserCtrl', ['$scope', '$location', '$log', 'RESTService', 'AuthService', function ($scope, $location, $log, RESTService, AuthService) {

    var baseUsersUri = '/users'
    var userId = AuthService.getUserInfo();
    var getUserUri = baseUsersUri + '/' + userId;
    var updateUserUri = baseUsersUri + "/" + userId;
    var deleteUserUri = baseUsersUri + "/" + userId;

    var passwordMinLenth = 6;

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
          $log.debug('Success creating new project');
          $location.path("/login");
        });
      }else{
        $log.warn('Password doesn\'t match');
        $scope.passwordMatch = false;
      }
    }

    $scope.cancelSignUp = function(){
      $log.debug('Cancel sign up');
      $location.path('/login');
    }


    $scope.editUser = function(email, firstname, lastname) {
      var payload = {
        id: userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
      }

      RESTService.put(updateUserUri, payload, function(data){
        $log.debug('Success editing user');
        $location.path('/user');
      });
    }

    $scope.cancelEditUser = function(){
      $log.debug('Cancel edit user');
      $location.path('/user');
    }

    $scope.deleteUser = function(){
      RESTService.delete(deleteUserUri, function(data){
        $log.debug('Success deleting user');
        AuthService.logout();
        $location.path('/home');
      });

    }

  }
]);
