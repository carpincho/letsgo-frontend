'use strict';

angular.module('myApp')
  .controller('UserCtrl', ['$rootScope', '$scope', '$location', '$log', 'RESTService', 'AuthService', '$timeout', 'UserService', '$cookieStore', function ($rootScope, $scope, $location, $log, RESTService, AuthService, $timeout, UserService, $cookieStore) {

    var userId = AuthService.getUserInfo();

    $scope.login = function(email, password, rememberMe){

      // validate inputs
      // do something with rememberMe
      var payload = {
        email: email,
        password: password
      };

      AuthService.login(payload, function(data){
        $log.debug("Success on login!");

        AuthService.setLoggedIn(true, data);
        AuthService.setInitialState(false);
        AuthService.setCurrentUser(email);

        $cookieStore.put( 'lets_go_session_client', AuthService.authorized());
        $cookieStore.put( 'lets_go_user_info', AuthService.getUserInfo());

      }, function(data){
        $log.error("Error on login!");
        // show the message
      });
    };

    $scope.logout = function(){
        $scope.puto = "putiti";
    }



    $scope.signUp = function(email, firstname, lastname, password, confirmPassword){

      var signupDataForm = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password
      };

      if (password == confirmPassword) {
        UserService.createUser(signupDataForm, function(data){
          $log.debug('Success creating new user');

          $timeout(function() { $scope.successMsgVisible = true;}, 30000);
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
        firstname: firstname,
        lastname: lastname,
        email: email,
      }

      UserService.editUser(userId, payload, function(data){
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
          password: password,
        }
        UserService.changePassword(userId, payload, function(data){
          $log.debug('Success changing password!');
          $scope.successMsgVisible = true;
          $timeout(function(){ $location.path('/projects');}, 1000);
        });
      }

    }

    $scope.cancelChangePassword = function(){
      $log.debug('Cancel change password');
      $location.path('/projects');
    }

    $scope.deleteUser = function(){
      UserService.deleteUser(userId, function(data){
        $log.debug('Success deleting user');
        AuthService.logout();
        $location.path('/home');
      });
    }

  }
]);
