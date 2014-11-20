'use strict';

angular.module('myApp')
  .controller('ProjectsCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {

      $scope.projects = [];

      // hardcoded data for testing ----
      var mySprint1 = { id: 1,
                        project_id: 1,
                        name: "Sprint 1",
                        status: 0,
                        start_date:"10/04/2014",
                        end_date: "1/02/2015",
                      };

      var mySprint2 = { id: 2,
                        project_id: 1,
                        name: "Sprint 2",
                        status: 0,
                        start_date:"10/04/2014",
                        end_date: "1/02/2015",
                      };

      var mySprint3 = { id: 3,
                        project_id: 3,
                        name: "Sprint 1",
                        status: 1,
                        start_date:"10/04/2014",
                        end_date: "1/02/2015",
                      };

      var myProject1 = { id: 1,
                         name: "Project 1",
                         description: "a brief description",
                         owner: 1,
                         status:"open",
                         start_date: "10/04/2014",
                         end_date: ""
      };

      var myProject2 = { id: 2,
                         name: "Project 2",
                         description: "another brief description",
                         owner: 1,
                         status:"open",
                         start_date: "10/04/2014",
                         end_date: ""
      };

      var myProject3 = { id: 3,
                         name: "Project 3",
                         description: "another brief description",
                         owner: 2,
                         status:"closed",
                         start_date: "10/04/2014",
                         end_date: "1/02/2015"
      };

      $scope.projects = [ myProject1, myProject2, myProject3 ];
      $scope.sprints = [mySprint1, mySprint2, mySprint3];
      // ------------------------


      var init = function() {
        $http.get('/users/1/projects')
          .success(function(data, status, header, config) {

            // the server json response
            //$scope.projects = data; <!-- the real response -->
            //console.log(JSON.stringify(data[0]));



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
