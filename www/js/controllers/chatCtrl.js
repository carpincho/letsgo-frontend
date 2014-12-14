'use strict';

angular.module('myApp')
.controller('ChatCtrl', ['$rootScope','$scope', '$routeParams', '$http', '$log', 'ChatService', 'AuthService','StoryService','TaskService','SharedProjectSprintService','SharedStoryTaskService','UserService','$interval',function ($rootScope,$scope, $routeParams, $http, $log,ChatService, AuthService,StoryService,TaskService,SharedProjectSprintService,SharedStoryTaskService,UserService,$interval) {

  var projectId = $routeParams.projectId;
  $scope.user_name = $rootScope.user_name;
  $scope.projectId = projectId;
  $scope.message_sended = "Write your message..."


  var launch_interval = function(){

    var var_1=$interval(function(){
      if (angular.isDefined($routeParams.projectId)) {
        getAllMsg();
      }else {
        console.log("Undefined projectID...");
        $interval.cancel(var_1);
        var_1 = undefined;
      }
    },10000);

  }


  var getAllMsg = function(){

    if (angular.isDefined($routeParams.projectId)) {

      $scope.projectId = projectId;
      ChatService.getAllMsg(projectId, function(data){
        $log.debug('Fetching ' + data.length + ' chat msg  from server...');
        $scope.messages = data;
        angular.forEach($scope.messages, function(value, key) {
          UserService.getUserById(value.user_id, function(data){
            value.name = data.firstname+" "+data.lastname ;
          });
        });


      });

    }

  }

  getAllMsg();
  launch_interval();


  $scope.sendMsg = function(msg) {

    if(angular.isDefined(msg) ){
      var date = new Date();
      //var date = "2012-04-23T18:25:43.511Z";
      var user_id = AuthService.getUserInfo();
      var sendMsgFormData = {
        text: msg,
        user_id: user_id,
        timestamp: date,
        project_id:parseInt(projectId),

      }
      $scope.messageText = "";
      ChatService.sendMsg(projectId,sendMsgFormData, function(data){
        $log.debug('Success sending msg');
        getAllMsg();

      });

    }
  }




}
]);
