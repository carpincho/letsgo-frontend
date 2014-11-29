'use strict';

angular.module('myApp')
  .controller('UserCtrl', ['$scope', '$location', '$log', 'RESTService', 'AuthService', '$timeout', function ($scope, $location, $log, RESTService, AuthService, $timeout) {

    var baseUsersUri = '/users'
    var userId = AuthService.getUserInfo();
    var getUserUri = baseUsersUri + '/' + userId;
    var updateUserUri = baseUsersUri + "/" + userId;
    var deleteUserUri = baseUsersUri + "/" + userId;


    $scope.signUp = function(email, firstname, lastname, password, confirmPassword){
      $scope.passwordMatch = false;

      var signupDataForm = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password
      };

      var payload = signupDataForm;

      if (password == confirmPassword) {
        $scope.passwordMatch = true;

        RESTService.post(baseUsersUri, payload, function(data){
          $log.debug('Success creating new user');

          $timeout(function() {
            $scope.successMsgVisible = true;
          }, 30000);
          $location.path("/login");
        });
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


    $scope.changePassword = function(password, confirmPassword) {
      if(password != undefined && confirmPassword != undefined){

        var payload = {
          id: userId,
          password: password,
        }
        RESTService.put(updateUserUri, payload, function(data){
          $log.debug('Success changing password!');
          $scope.successMsgVisible = true;
          $timeout(function(){
            $location.path('/projects');
          }, 1000);
        });
      }

    }


    $scope.cancelChangePassword = function(){
      $log.debug('Cancel change password');
      $location.path('/projects');
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
