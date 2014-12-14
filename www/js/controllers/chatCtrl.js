'use strict';

angular.module('myApp')
.controller('ChatCtrl', ['$rootScope','$scope', '$routeParams', '$http', '$log', 'ChatService', 'AuthService','SprintService','StoryService','TaskService','SharedProjectSprintService','SharedStoryTaskService','$interval',function ($rootScope,$scope, $routeParams, $http, $log,ChatService, AuthService,SprintService,StoryService,TaskService,SharedProjectSprintService,SharedStoryTaskService,$interval) {

  var projectId = $routeParams.projectId;
  $scope.user_name = $rootScope.user_name;
  $scope.projectId = projectId;
  var getmsg = function() {

    var projectId = $routeParams.projectId;

    if (angular.isDefined($routeParams.projectId)) {

      $scope.projectId = projectId;
      ChatService.getAllMsg(projectId, function(data){
        $log.debug('Fetching ' + data.length + ' chat msg  from server...');
        $scope.messages = data;


    });

}
    var var_1=$interval(function(){
      if (angular.isDefined($routeParams.projectId)) {
        getmsg();
        console.log("interval");
      }else {
        console.log("Indefinido projectID...");
        $interval.cancel(var_1);
        var_1 = undefined;
      }
    },6000);
  }

  getmsg();


  $scope.sendMsg = function(msg) {

    var date = new Date();
    //var date = "2012-04-23T18:25:43.511Z";
    var user_id = AuthService.getUserInfo();

    var sendMsgFormData = {
      text: msg,
      user_id: user_id,
      timestamp: date,
      project_id:parseInt(projectId),

    }

    console.log(sendMsgFormData);
    ChatService.sendMsg(projectId,sendMsgFormData, function(data){
      $log.debug('Success sending msg');
      getmsg();

    });


  }




}
]);
