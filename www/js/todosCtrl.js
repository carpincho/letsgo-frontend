'use strict';

angular.module('Demo')
  .controller('TodosCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {

      // we store all data in the data array
      $scope.todos = [];

      $scope.todoModel = {
        description: ''
      }

      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      var init = function() {
        $http.get('/api/todos')
          .success(function(data, status, header, config) {
            
            // the server should return a json array which contains all the todos
            $scope.todos = data;
          })
          .error(function(data, status) {
            $log.debug('Error while fetching todos from server');
          });

      }();

      // function to remove a todo with the given id
      $scope.removeTodo = function(todoId) {
        $log.debug("Removing todo " + todoId);

        // find the element in the data array and remove it
        for(var i =0; i < $scope.todos.length; i++) {
          if($scope.todos[i].todoId === todoId) {
            $scope.todos.splice(i, 1);
          }
        }

        $http.delete('/api/todos/' + todoId)
          .success(function(data, status, header, config) {
            $log.debug('Success removing todo item');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to remove todo item on server');
          });
      }


      // Function to add a new todo to the list.
      // Note: we provide the description and the user as parameters as this makes it easier to test
      // the funciton. We could directly access the $scope.todoModel to get the same values.
      // But then our unit-test would have account for that dependency.
      $scope.addTodo = function(todoDescription) {
        
        // construct the payload that we will send as part of the post request
        var payload = {
          description: todoDescription
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/todos', payload)
          .success(function(data, status, header, config) {
            // the server should return a json object that represents the new todo item
            // we add the item to the list of todos
            $log.debug('Success adding new todo');
            // add the new todo to our list of todos
            $scope.todos.push(data);
            // reset the todoModel to not have a description (we keep the last selected user)
            $scope.todoModel.description = '';
          })
          .error(function(data, status) {
            $log.debug('Error while trying to add new todo item');

            alert("You must login first.")
          });
      }
    } 
  ]);
