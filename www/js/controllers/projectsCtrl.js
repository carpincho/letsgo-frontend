'use strict';

angular.module('myApp')
.controller('ProjectsCtrl', ['$scope', '$location', '$routeParams', '$http', '$log', 'AuthService', 'SharedProjectSprintService', 'ProjectService', 'UserService',function ($scope, $location, $routeParams, $http, $log, AuthService, SharedProjectSprintService, ProjectService,UserService) {

  var userId = AuthService.getUserInfo();
  $scope.project_status_options = ProjectService.getProjectStatusOptions();
  $scope.projects = [];
  $scope.assigned_devs = [];

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
    if(description==undefined){description="";}
    var createFormData = {
      name: name,
      description: description,
      start_date: startDate,
      end_date: endDate,
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
        console.log(data);
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

  $scope.inviteDevelopersToProject = function(email) {
    var projectId = $scope.project_retrieved.id;
    // var payload = developers;
    var payload = {
      email: email
    };
    $scope.assigned_devs.push([{id:"",email:email}])
    ProjectService.inviteDevelopersToProject(projectId, payload, function(){
      $log.debug('Success inviting developers to project');
    });
  }

  $scope.removeDevelopersFromProject = function(developer) {
    var projectId = $scope.project_retrieved.id;
    // var payload = developers;
    var payload = {
      devs: [developer.id],
    };
    //getProjectById($routeParams.projectId);
    for(var i=0;i<$scope.assigned_devs.length;i++){
      if ($scope.assigned_devs[i].id==developer.id){
        $scope.assigned_devs.splice(i,1);
        break;
      }
    }
    ProjectService.removeDevelopersFromProject(projectId, payload, function(){
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
    angular.forEach(data.invited_devs, function(value, key) {
      this.push({id:value, email:""});
    },$scope.assigned_devs);
    angular.forEach($scope.assigned_devs, function(value, key) {
      UserService.getUserById(value.id, function(data){
        value.email = data.email ;
        console.log(value);
      });
    });
  }


}
]);
