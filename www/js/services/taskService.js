app.factory('TaskService', ['$http', 'RESTService', function ($http, RESTService){

  var currentProjectName = "someProject";
  var currentSprintName = "someSprint";
  var currentStoryName = "SomeStory";
  var taskPath = "/projects/";

  return{

    getCurrentStory: function(){
      var currentStory = currentProjectName+" > "+currentSprintName+" > "+currentStoryName;
      return currentStory;
    },

    getCurrentStoryID:function(){
      return currentStoryID;
    },

    getTaskPath: function(projectId, sprintId, storyId){
      return "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks";;
    },

    getAllTasks: function(projectId, sprintId, storyId,callback){
      var url  = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks";
      RESTService.get(url, callback);
    },

    createTask: function(projectId, sprintId, storyId,payload, callback){
      var url = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks";
      RESTService.post(url, payload, callback);
    },

    getTaskById: function (taskId, callback) {
      var url  = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks" + "/" + taskId;
      RESTService.get(url, callback);
    },

    editTask: function(taskId, payload, callback){
      var url  = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks" + "/" + taskId;
      RESTService.put(url, payload, callback);
    },

    deleteTask: function(taskId, callback){
      var url  = "/projects/" + projectId + "/sprints/" + sprintId + "/stories/" + storyId + "/tasks" + "/" + taskId;
      RESTService.delete(url, callback);
    }

  };
}]);
