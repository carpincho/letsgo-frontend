app.factory('ProjectService', ['$log', '$http', 'RESTService', function($log, $http, RESTService){
  var baseUrl = '/projects';
  var projectStatusOptions = [
  { label:'open', value: 0 },
  { label:'closed', value: 1 },
  ];

  return {

    getOptionByValue: function (value){
      var i = 0;
      var foundOption = {};

      for (i=0; i < projectStatusOptions.length; i++){
        if(projectStatusOptions[i].value == value){
          foundOption = projectStatusOptions[i]
          break;
        }
      }
      return foundOption;
    },

    getprojectStatusOptions: function(){
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
      RESTService.put(url, payload, callback);
    },

    removeDevelopersFromProject: function(projectId, developers, callback){
      var url = baseUrl + "/" + projectId;
      RESTService.put(url, payload, callback);
    },
  }

}]);
