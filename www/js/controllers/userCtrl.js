'use strict';

angular.module('myApp')
.controller('UserCtrl', ['$rootScope', '$scope', '$location', '$log', 'RESTService', 'AuthService', '$timeout', 'UserService', '$cookieStore', function ($rootScope, $scope, $location, $log, RESTService, AuthService, $timeout, UserService, $cookieStore) {

  if (AuthService.isLoggedIn()){
    var userId = AuthService.getUserInfo();
    $scope.isLoggedIn = AuthService.isLoggedIn();

    if (!angular.isUndefined(userId) && AuthService.isLoggedIn()){
      UserService.getUserById(userId, function(userInfo){
        $scope.userInfo = userInfo;
        $rootScope.user_name = userInfo.firstname;
      });
    }
  }


  $scope.login = function(email, password, rememberMe){

    // validate inputs
    // do something with rememberMe
    var payload = {
      email: email,
      password: password
    };

    AuthService.login(payload, function(data){
      $log.debug("Success on login!");
      $scope.successMsgVisible = true;
      AuthService.setLoggedIn(true, data);
      AuthService.setInitialState(false);
      AuthService.setCurrentUser(email);

      $cookieStore.put( 'lets_go_session_client', AuthService.authorized());
      $cookieStore.put( 'lets_go_user_info', AuthService.getUserInfo());
      $location.path("/projects")

    }, function(data){
      $log.error("Error on login!");
      $scope.errorMsgVisible = true;
      $timeout(function(){
        $scope.errorMsgVisible = false;
      },3000);
    });
  };

  $scope.logout = function(){

    $scope.isLoggedIn =false;
    AuthService.setCurrentUser(null);
    AuthService.setLoggedIn(false, null);

    $cookieStore.remove('lets_go_session_client');
    $cookieStore.remove('lets_go_user_info');

    AuthService.logout(function(data){
      $log.debug('API Success logging out!');
    }, function(data){
      $log.error('API Failed logging out!');
    });
  };




    $scope.signUp = function(email, firstname, lastname, password, confirmPassword){
      if(lastname==undefined){lastname = "";}
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
      if(lastname == undefined){lastname="";}
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

    $scope.changePassword = function(password, confirmPassword) {
      if(password != undefined && confirmPassword != undefined){

        var payload = {
          password: password,
        }
        UserService.changePassword(userId, payload, function(data){
          $log.debug('Success changing password!');
          $scope.successMsgVisible = true;
          $timeout(function(){ $location.path(window.history.back());}, 1000);
        });
      }
    }

    $scope.cancelEditUser = function(){
      $log.debug('Cancel edit user');
      $location.path('/user');
    }

    $scope.cancelChangePassword = function(){
      $log.debug('Cancel change password');
      $location.path(window.history.back());
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
