app.factory('ProjectService', ['$log', '$http', '$rootScope', 'RESTService', function($log, $http, $rootScope,RESTService){
  var baseUrl = '/projects';
  var projectStatusOptions = [
    { label:'Open', value: 0 },
    { label:'Closed', value: 1 },
  ];

  return {

    getOptionByValue: function (value){
      var i=0;
      var foundOption = {};

      for (i=0; i<projectStatusOptions.length; i++){
        if(projectStatusOptions[i].value == value){
          foundOption = projectStatusOptions[i]
          break;
        }
      }
      return foundOption;
    },

    getLabelFromValue: function(value){
      var label = '';
      for (var i=0; i<projectStatusOptions.length; i++){
        if(projectStatusOptions[i].value == value){
          label = projectStatusOptions[i].label;
          break;
        }
      }
      return label;
    },

    getProjectStatusOptions: function(){
      return projectStatusOptions;
    },

    getAllProjects: function (callback) {
      var url = baseUrl;
      RESTService.get(url, callback);
    },

    getProjectById: function (projectId, callback) {
      var url = baseUrl + "/" + projectId;
      RESTService.get(url, callback);
    },

    createProject: function(payload, callback){
      var url = baseUrl;
      RESTService.post(url, payload, callback);
    },

    editProject: function(projectId, payload, callback){
      var url = baseUrl + "/" + projectId;
      RESTService.put(url, payload, callback);
    },

    deleteProject: function(projectId, callback){
      var url = baseUrl + "/" + projectId;
      RESTService.delete(url, callback);
    },

    inviteDevelopersToProject: function(projectId, developers, callback){
      var url = baseUrl + "/" + projectId;
      RESTService.put(url, developers, callback);
    },

    removeDevelopersFromProject: function(projectId, developers, callback){
      var url = baseUrl + "/" + projectId;
      RESTService.put(url, developers, callback);

    },
  }

}]);
