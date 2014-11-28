app.factory('TaskService', ['$http', 'RESTService', function ($http, RESTService){
  var currentProjectID = 1;
  var currentSprintID = 1;
  var currentStoryID = 1;
  var currentProjectName = "someProject";
  var currentSprintName = "someSprint";
  var currentStoryName = "SomeStory";
  var taskPath = "/projects/" + currentProjectID + "/sprints/" + currentSprintID + "/stories/" + currentStoryID + "/tasks";
  return{

    getCurrentStory: function(){
      var currentStory = currentProjectName+" > "+currentSprintName+" > "+currentStoryName;
      return currentStory;
    },

    getCurrentStoryID:function(){
      return currentStoryID;
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
    }

};
}]);
