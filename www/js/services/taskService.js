app.factory('TaskService', ['$http', 'RESTService', function ($http, RESTService){
  var currentProjectId = 1;
  var currentSprintId = 1;
  var currentStoryId = 1;
  var currentProjectName = "someProject";
  var currentSprintName = "someSprint";
  var currentStoryName = "SomeStory";
  var taskPath = "/projects/" + currentProjectId + "/sprints/" + currentSprintId + "/stories/" + currentStoryId + "/tasks";
  return{

    getCurrentStoryPath: function(){
      var currentStory = "/projects/" + currentProjectId + "/sprints/" + currentSprintId + "/stories/" + currentStoryId;
      return currentStory;
    },

    getCurrentStoryId:function(){
      return currentStoryId;
    },

    getTaskPath: function(){
      return taskPath;
    },
    getAllTasks: function(callback){
    var url =taskPath;
    RESTService.get(url, callback);
    },
    createTask: function(payload, callback){
      var url = taskPath;
      RESTService.post(url, payload, callback);
    },
    getTaskById: function (taskId, callback) {
      var url = taskPath + "/" + taskId;
      RESTService.get(url, callback);
    },
    editTask: function(taskId, payload, callback){
      var url = taskPath + "/" + taskId;
      RESTService.put(url, payload, callback);
    },
    deleteTask: function(taskId, callback){
      var url = taskPath + "/" + taskId;
      RESTService.delete(url, callback);
    },
    assignDevelopersToTask: function(taskId, payload, callback){
      var url = taskPath + "/" + taskId + "/assign_devs";
      RESTService.put(url, payload, callback);
    },
    unassignDevelopersToTask: function(taskId, payload, callback){
      var url = taskPath + "/" + taskId + "/unassign_devs";
      RESTService.put(url, payload, callback);
    }

};
}]);
