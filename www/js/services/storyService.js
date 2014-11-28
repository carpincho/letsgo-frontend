app.factory('StoryService', ['$log', '$http', 'RESTService', function($log, $http, RESTService){
  var baseUrl = '/projects';


  return {

    getStoriesBySprintId: function (projectId, sprintId, callback) {
      var url = baseUrl+"/" +projectId+'/sprints/'+sprintId+'/stories';
      RESTService.get(url, callback);

    },

    getStoryByStoryId: function (projectId, sprintId, storyId, callback) {
      var url = baseUrl +"/" +projectId+'/sprints/'+sprintId+'/stories/'+storyId;
      RESTService.get(url, callback);
    },

    createStory: function(projectId,sprintId, payload, callback){
      var url = baseUrl + "/" + projectId + "/sprints/"+sprintId+'/stories';
      RESTService.post(url, payload, callback);

    },

    deleteStory: function(projectId, sprintId,StoryId, callback){
      var url = baseUrl + "/" + projectId + "/sprints/" + sprintId+'/stories/'+StoryId;;
      RESTService.delete(url, callback);

    },

    editStory: function(projectId, sprintId,storyId, payload, callback){
       var url = baseUrl + "/" + projectId + "/sprints/" + sprintId+'/stories/'+storyId;
       RESTService.put(url, payload, callback);


     },

  }

}]);
