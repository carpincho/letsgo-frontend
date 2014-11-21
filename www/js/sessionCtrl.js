'use strict';

angular.module('Demo')
  .controller('SessionCtrl', ['$scope', '$http', '$log', '$timeout',
    function ($scope, $http, $log, $timeout) {

      // the model that we bind to the input box
      $scope.formData = {
        username: '',
        password: ''
      }

      $scope.successMsgVisible = false;
      $scope.errorMsgVisible = false;

      // the function to login
      $scope.login = function(username, password) {

        // the payload is simple the json object that we used for binding to the input
        var payload = {
          username: username,
          password: password
        }

        $http.post('/api/sessions', payload)
          .success(function(data, status, header, config) {

            $log.debug('Success logging in the user');

            // show a success message
            $scope.successMsgVisible = true;
            // let the message dissapear after 2 secs
            $timeout(function() {$scope.successMsgVisible = false;}, 2000);
          })
          .error(function(data, status) {
            $log.debug('Error while trying to login user.');

            // show a success message
            $scope.errorMsgVisible = true;
            // let the message dissapear after 2 secs
            $timeout(function() {$scope.errorMsgVisible = false;}, 2000);

          });
      }


      // the function to logout
      $scope.logout = function() {

        $http.delete('/api/sessions')
          .success(function(data, status, header, config) {

            $log.debug('Success logging out the user');

            // show a success message
            $scope.successMsgVisible = true;
            // let the message dissapear after 2 secs
            $timeout(function() {$scope.successMsgVisible = false;}, 2000);
          })
          .error(function(data, status) {
            $log.debug('Error while logging out the user.');
          });
      }
    } 
  ]);
