app.factory('SprintService', ['$log', '$http', 'RESTService', function($log, $http, RESTService){
  var baseUrl = '/projects';
  var sprintStatusOptions = [
    { label:'Future', value: 0 },
    { label:'Closed', value: 1 },
    { label:'In-progress', value: 2 },
    { label:'Planned', value: 3 },
  ];

  return {
    getOptionByValue: function (value){
      var foundOption={};

      for (var i=0; i<sprintStatusOptions.length; i++){
        if(sprintStatusOptions[i].value == value){
          foundOption = sprintStatusOptions[i]
          break;
        }
      }
      return foundOption;
    },

    getLabelFromValue: function(value){
     var label = '';
     for (var i=0; i<sprintStatusOptions.length; i++){
       if(sprintStatusOptions[i].value == value){
         label = sprintStatusOptions[i].label;
         break;
       }
     }
     return label;
    },

    getSprintStatusOptions: function(){
      return sprintStatusOptions;
    },

    getSprintsByProjectId: function (projectId, callback) {
      var url = baseUrl + "/" + projectId + "/sprints";
      RESTService.get(url, callback);
    },

    getSprintBySprintId: function (projectId, sprintId, callback) {
      var url = baseUrl + "/" + projectId + "/sprints/" + sprintId;
       RESTService.get(url, callback);
    },

    createSprint: function(projectId, payload, callback){
      var url = baseUrl + "/" + projectId + "/sprints";
      RESTService.post(url, payload, callback);
    },

    editSprint: function(projectId, sprintId, payload, callback){
       var url = baseUrl + "/" + projectId + "/sprints/" + sprintId;
       RESTService.put(url, payload, callback);
     },

    deleteSprint: function(projectId, sprintId, callback){
      var url = baseUrl + "/" + projectId + "/sprints/" + sprintId;
      RESTService.delete(url, callback);
    },

  }

}]);
