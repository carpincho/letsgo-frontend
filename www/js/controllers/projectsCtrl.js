'use strict';

angular.module('myApp')
.controller('ProjectsCtrl', ['$scope', '$location', '$routeParams', '$http', '$log', 'AuthService', 'SharedProjectSprintService', 'ProjectService', 'UserService',function ($scope, $location, $routeParams, $http, $log, AuthService, SharedProjectSprintService, ProjectService,UserService) {

  var userId = AuthService.getUserInfo();
  $scope.project_status_options = ProjectService.getProjectStatusOptions();
  $scope.projects = [];

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

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
  $scope.format = $scope.formats[1];
  //---end config


  var getProjects = function() {
    ProjectService.getAllProjects(function(data){
      $log.debug('Fetching ' + data.length + ' projects from server...');
      $scope.projects = data;
    });
  }
  // fetch the existing projects as init
  getProjects();


  $scope.createProject = function(name, description, startDate, endDate, status) {
    var createFormData = {
      name: name,
      description: description,
      start_date: startDate,
      end_date: endDate,
      status: parseInt(status),
      owner: userId,
    }

    ProjectService.createProject(createFormData, function(data){
      $log.debug('Success creating new project');
      $location.path("/projects");
    });
  }


  $scope.cancelCreateProject = function(){
    $location.path("/projects");
  }


  var getProjectById = function(projectId) {
    if(projectId != undefined && projectId != null) {

      ProjectService.getProjectById(projectId, function(data){
        $log.debug('Success getting a project');
        $scope.project_retrieved = data;
        $scope.getIviteDevelopersByProject(data);
        $scope.project_option_selected = ProjectService.getOptionByValue(data.status)
      });
    }
  }
  // get project from url
  getProjectById($routeParams.projectId);


  $scope.updateProject = function(projectId, name, description, start_date, end_date, status) {
    var updateFormData = {
      id: projectId,
      name: name,
      description: description,
      start_date: start_date,
      end_date: end_date,
      status: parseInt(status),
      owner: userId,
    }

    ProjectService.editProject(projectId, updateFormData, function(){
      $log.debug('Success updating a project');
      $location.path('/projects');
    });
  }


  $scope.cancelUpdateProject = function(){
    $location.path("/projects");
  }


  $scope.deleteProject = function(projectId) {
    ProjectService.deleteProject(projectId, function(data){
      $log.debug('Success deleting project');
      $scope.sendEventProjectId();
      getProjects();
    });
  }


  $scope.inviteDevelopersToProject = function(developers) {
    var projectId = 67;
    // var payload = developers;
    var payload = {
      devs: [1, 2]
    };

    ProjectService.inviteDevelopersToProject(projectId, payload, function(){
      $log.debug('Success inviting developers to project');
    });
  }


  $scope.removeDevelopersFromProject = function(developers) {
    var projectId = 67;
    // var payload = developers;
    var payload = {
      devs: [1, 2]
    };

    ProjectService.inviteDevelopersToProject(projectId, payload, function(){
      $log.debug('Success removing developers to project');
    });
  }

  $scope.sendEventProjectId = function(projectId){
    SharedProjectSprintService.prepForBroadcast(projectId);
  };


  $scope.redirectTo = function (projectId,sprintId)
  {

    var path = '/projects/'+projectId+'/sprints/'+sprintId+'/stories'
    $location.path(path);
  }


  $scope.getIviteDevelopersByProject = function(data){

    $scope.inviteDevelopersToProjectNames = [];
    angular.forEach(data.invited_devs, function(value, key) {
      UserService.getUserById(value, function(data){
        $scope.inviteDevelopersToProjectNames.push(data.firstname+" "+data.lastname );


      });
    });


  }


}
]);
