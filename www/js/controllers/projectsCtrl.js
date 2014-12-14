'use strict';

angular.module('myApp')
.controller('ProjectsCtrl', ['$timeout', '$scope', '$location', '$routeParams', '$http', '$log', 'AuthService', 'SharedProjectSprintService', 'ProjectService', 'UserService',function ($timeout, $scope, $location, $routeParams, $http, $log, AuthService, SharedProjectSprintService, ProjectService,UserService) {

  var userId = AuthService.getUserInfo();
  $scope.project_status_options = ProjectService.getProjectStatusOptions();
  $scope.projects = [];
  $scope.assigned_devs = [];
  $scope.ownerEmail = {
    id:0,
    email:""
  };

  //--- datepicker config
  $scope.open_start_date  = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.start_date_opened = true;
  };

  $scope.open_end_date = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.end_date_opened = true;
  };

  $scope.formats = ['yyyy/MM/dd'];
  $scope.format = $scope.formats[0];
  //---end config

  var getProjects = function() {
    ProjectService.getAllProjects(function(data){
      $log.debug('Fetching ' + data.length + ' projects from server...');
      $scope.projects = data;

      angular.forEach($scope.projects,function(project, key){
        UserService.getUserById(project.owner, function(data){
          project.ownerName = data.firstname + " " + data.lastname;
        });
      })

    });
  }
  // fetch the existing projects as init
  if($routeParams.projectId==undefined){
    getProjects();
  }

  $scope.createProject = function(name, description, startDate, endDate) {
    var d_start_date = new Date(start_date);
    var d_end_date = new Date(end_date);
    if(description==undefined){description="";}
    var createFormData = {
      name: name,
      description: description,
      start_date: formattedDate(d_start_date),
      end_date: formattedDate(d_end_date),
      status: 0,
      owner: userId,
    }

    ProjectService.createProject(createFormData, function(data){
      $log.debug('Success creating new project');
      $location.path("/projects");
    });
  }

  $scope.cancelCreateProject = function(){
    $location.path(window.history.back());
  }

  var getProjectById = function(projectId) {
    if(projectId != undefined && projectId != null) {
      ProjectService.getProjectById(projectId, function(data){
        $log.debug('Success getting a project');
        $scope.project_retrieved = data;
        $scope.getInvitedDevelopersByProject(data);
        $scope.project_option_selected = ProjectService.getOptionByValue(data.status)
      });
    }
  }
  // get project from url
  getProjectById($routeParams.projectId);

  $scope.updateProject = function(projectId, name, description, start_date, end_date, status) {
    if(description==undefined){description="";}
    var d_start_date = new Date(start_date);
    var d_end_date = new Date(end_date);
    var updateFormData = {
      id: projectId,
      name: name,
      description: description,
      start_date: formattedDate(d_start_date),
      end_date: formattedDate(d_end_date),
      status: parseInt(status),
      owner: userId,
    }

    ProjectService.editProject(projectId, updateFormData, function(){
      $log.debug('Success updating a project');
      $location.path('/projects');
    });
  }

  $scope.cancelUpdateProject = function(){
    $location.path(window.history.back());
  }

  $scope.goBack = function(){
    $location.path(window.history.back());
  }

  $scope.deleteProject = function(projectId) {
    ProjectService.deleteProject(projectId, function(data){
      $log.debug('Success deleting project');
      $scope.sendEventProjectId();
      getProjects();
    });
  }

  var existDev = function(email){
    var exist = false;
    for(var i=0;i<$scope.assigned_devs.length;i++){
      if(email==$scope.assigned_devs[i].email){
        exist = true;
      }
    }
    if(email==$scope.ownerEmail.email){exist = true;}
    return exist;
  }

  $scope.inviteDevelopersToProject = function(email) {
    var projectId = $scope.project_retrieved.id;
    if(!existDev(email)){
      var payload = {
        email: email
      };
      ProjectService.inviteDevelopersToProject(projectId, payload, function(){
        //$scope.assigned_devs.push({id:"",email:email})
        getProjectById($routeParams.projectId);
        $log.debug('Success inviting developers to project');
      },function(){
        $scope.errorMsgInvite = true;
        $timeout(function(){
          $scope.errorMsgInvite = false;
        }, 2000);
      });
    }
    else {
      $scope.errorMsgExist = true;
      $timeout(function(){
        $scope.errorMsgExist = false;
      }, 2000);
    }
    // var payload = developers;

  }

  $scope.removeDevelopersFromProject = function(developer) {
    var projectId = $scope.project_retrieved.id;
    // var payload = developers;
    var payload = {
      devs: [developer.id],
    };
    //
    for(var i=0;i<$scope.assigned_devs.length;i++){
      if ($scope.assigned_devs[i].id==developer.id){
        $scope.assigned_devs.splice(i,1);
      }
    }
    ProjectService.removeDevelopersFromProject(projectId, payload, function(){
      //getProjectById($routeParams.projectId);
      $log.debug('Success removing developers to project');
    });
  }

  $scope.sendEventProjectId = function(projectId){
    SharedProjectSprintService.prepForBroadcast(projectId);
  };

  $scope.redirectTo = function (projectId, sprintId){
    var path = '/projects/'+projectId+'/sprints/'+sprintId+'/stories'
    $location.path(path);
  }

  $scope.getInvitedDevelopersByProject = function(data){
    $scope.assigned_devs=[];
    angular.forEach(data.invited_devs, function(value, key) {
      this.push({id:value, email:""});
    },$scope.assigned_devs);

    angular.forEach($scope.assigned_devs, function(value, key) {
      UserService.getUserById(value.id, function(data){
        value.email = data.email ;
      });
    });

    for(var j=0;j<$scope.assigned_devs.length;j++){
      if($scope.assigned_devs[j].id == data.owner){
        $scope.ownerEmail = $scope.assigned_devs[j];
        $scope.assigned_devs.splice(j,1);
        break;
      }
    }

  }

  $scope.CommitProjectShare = function(){
    $location.path(window.history.back());
  }

  var formattedDate = function(date) {
    var d = new Date(date || Date.now()),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [ year,month, day ].join('-');
  }


}
]);
