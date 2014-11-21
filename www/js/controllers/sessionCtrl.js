'use strict';

angular.module('myApp')
  .controller('SessionCtrl', ['$scope', '$http', '$log', '$timeout','$cookieStore',
    function ($scope, $http, $log, $timeout, $cookieStore) {

      // the model that we bind to the input box
      $scope.formData = {
        email: '',
        password: ''
      }

      var logged = false;
      $scope.successMsgVisible = false;
      $scope.errorMsgVisible = false;

      // the function to login
      $scope.login = function(email, password) {

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
            $scope.successMsgVisible = true;
            // let the message dissapear after 2 secs
            $timeout(function() {$scope.successMsgVisible = false;}, 2000);
            logged = true;


          })
          .error(function(data, status) {
            //$log.debug('Error while trying to login user.');
            console.log('Error while trying to login user.');
            // show a success message
            $scope.errorMsgVisible = true;
            // let the message dissapear after 2 secs
            $timeout(function() {$scope.errorMsgVisible = false;}, 2000);
          });
      }


      // the function to logout
      $scope.logout = function() {

        $http.delete('/sessions')
          .success(function(data, status, header, config) {

            //$log.debug('Success logging out the user');
            console.log('Success logging out the user');
            // show a success message
            $scope.successMsgVisible = true;
            // let the message dissapear after 2 secs
            $timeout(function() {$scope.successMsgVisible = false;}, 2000);
            logged = false;

          })
          .error(function(data, status) {
            //$log.debug('Error while logging out the user.');
            console.log('Error while logging out the user.');
          });
      }

      $scope.isLogged = function(){
        return logged;
      }
    }
  ]);
